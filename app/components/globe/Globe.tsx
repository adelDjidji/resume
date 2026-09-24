"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { arcPoints, landDots, latLngToVector3, rotationToFace } from "./geo";

export type GlobeMarker = {
  id: string;
  lat: number;
  lng: number;
};

export type DragState = {
  dragging: boolean;
  dx: number;
  dy: number;
  lastInteraction: number;
};

type Props = {
  markers: GlobeMarker[];
  home: { lat: number; lng: number };
  focus: { lat: number; lng: number };
  drag: MutableRefObject<DragState>;
  /** DOM elements (keyed by marker id) pinned to each marker's projected screen position. */
  markerEls: MutableRefObject<Record<string, HTMLElement | null>>;
  active: boolean;
};

const MINT = new THREE.Color("#65d2a5");
const AQUA = new THREE.Color("#2fbcd8");

const dotVertex = /* glsl */ `
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vFade;
  varying float vMix;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vec3 n = normalize(world.xyz);
    vFade = smoothstep(0.0, 0.55, dot(n, normalize(cameraPosition - world.xyz)));
    vMix = position.y * 0.5 + 0.5;
    vec4 mv = viewMatrix * world;
    gl_PointSize = uSize * uPixelRatio / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;
const dotFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vFade;
  varying float vMix;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.2, d) * (0.25 + 0.75 * vFade);
    gl_FragColor = vec4(mix(uColorA, uColorB, vMix), a);
  }
`;

const bodyVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(mat3(modelMatrix) * normal);
    vView = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;
const bodyFragment = /* glsl */ `
  uniform vec3 uRim;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float f = pow(1.0 - max(dot(vNormal, vView), 0.0), 3.0);
    vec3 base = vec3(0.035, 0.075, 0.09);
    gl_FragColor = vec4(base + uRim * f * 0.55, 1.0);
  }
`;

const haloVertex = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const haloFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  void main() {
    float i = pow(max(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 3.5);
    gl_FragColor = vec4(uColor, 1.0) * i * 1.7;
  }
`;

const arcVertex = /* glsl */ `
  attribute float aT;
  varying float vT;
  void main() {
    vT = aT;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const arcFragment = /* glsl */ `
  uniform float uTime;
  uniform float uOffset;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vT;
  void main() {
    float head = fract(uTime * 0.22 + uOffset);
    float trail = smoothstep(0.28, 0.0, head - vT) * step(vT, head);
    float edge = smoothstep(0.0, 0.08, vT) * smoothstep(1.0, 0.92, vT);
    float a = (0.14 + trail * 0.85) * edge;
    gl_FragColor = vec4(mix(uColorA, uColorB, vT), a);
  }
`;

function shortestAngle(from: number, to: number) {
  return ((((to - from) % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
}

function Arcs({ home, markers }: { home: Props["home"]; markers: GlobeMarker[] }) {
  // Rebuild only when coordinates change, not when marker content does
  const coords = markers.map((m) => `${m.lat},${m.lng}`).join("|");
  const lines = useMemo(() => {
    const start = latLngToVector3(home.lat, home.lng, 1.001);
    return coords
      .split("|")
      .map((c) => c.split(",").map(Number))
      .filter(([lat, lng]) => latLngToVector3(lat, lng).distanceTo(start) > 0.05)
      .map(([lat, lng], i) => {
        const pts = arcPoints(start, latLngToVector3(lat, lng, 1.001));
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        geo.setAttribute("aT", new THREE.Float32BufferAttribute(pts.map((_, k) => k / (pts.length - 1)), 1));
        const mat = new THREE.ShaderMaterial({
          vertexShader: arcVertex,
          fragmentShader: arcFragment,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: {
            uTime: { value: 0 },
            uOffset: { value: i * 0.27 },
            uColorA: { value: MINT },
            uColorB: { value: AQUA },
          },
        });
        return new THREE.Line(geo, mat);
      });
  }, [home.lat, home.lng, coords]);

  useEffect(
    () => () =>
      lines.forEach((l) => {
        l.geometry.dispose();
        (l.material as THREE.Material).dispose();
      }),
    [lines],
  );

  useFrame(({ clock }) => {
    for (const l of lines) (l.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <>
      {lines.map((l, i) => (
        <primitive key={i} object={l} />
      ))}
    </>
  );
}

function HomeBeacon({ lat, lng }: { lat: number; lng: number }) {
  const ring = useRef<THREE.Mesh>(null);
  const { position, quaternion } = useMemo(() => {
    const p = latLngToVector3(lat, lng, 1.003);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), p.clone().normalize());
    return { position: p, quaternion: q };
  }, [lat, lng]);

  useFrame(({ clock }) => {
    if (!ring.current) return;
    const t = (clock.elapsedTime * 0.6) % 1;
    ring.current.scale.setScalar(1 + t * 3.2);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = 0.9 * (1 - t);
  });

  return (
    <group position={position} quaternion={quaternion}>
      <mesh>
        <circleGeometry args={[0.014, 24]} />
        <meshBasicMaterial color={MINT} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.016, 0.02, 48]} />
        <meshBasicMaterial color={MINT} transparent depthWrite={false} />
      </mesh>
    </group>
  );
}

function Scene({ markers, home, focus, drag, markerEls }: Omit<Props, "active">) {
  const globe = useRef<THREE.Group>(null);
  const { gl } = useThree();
  const anchorKey = markers.map((m) => `${m.id}:${m.lat},${m.lng}`).join("|");
  const anchors = useMemo(
    () =>
      anchorKey.split("|").map((entry) => {
        const [id, coords] = entry.split(":");
        const [lat, lng] = coords.split(",").map(Number);
        return { id, local: latLngToVector3(lat, lng, 1.005) };
      }),
    [anchorKey],
  );
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const normal = useMemo(() => new THREE.Vector3(), []);
  const toCam = useMemo(() => new THREE.Vector3(), []);
  const rot = useRef({ ...rotationToFace(focus.lat, focus.lng), vy: 0, vx: 0 });
  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const dots = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(landDots(30000, 1.002), 3));
    return geo;
  }, []);
  const dotUniforms = useMemo(
    () => ({
      uSize: { value: 11 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uColorA: { value: AQUA },
      uColorB: { value: MINT },
    }),
    [gl],
  );
  useEffect(() => () => dots.dispose(), [dots]);

  useFrame(({ clock, camera, size }, delta) => {
    const g = globe.current;
    if (!g) return;
    const r = rot.current;
    const d = drag.current;
    const dt = Math.min(delta, 0.05);

    if (d.dragging) {
      r.vy = d.dx * 0.005;
      r.vx = d.dy * 0.005;
      r.y += r.vy;
      r.x = THREE.MathUtils.clamp(r.x + r.vx, -1.1, 1.1);
      d.dx = d.dy = 0;
    } else if (performance.now() - d.lastInteraction < 2600) {
      // Coast with inertia after the user lets go
      r.vy *= 0.94;
      r.vx *= 0.94;
      r.y += r.vy;
      r.x = THREE.MathUtils.clamp(r.x + r.vx, -1.1, 1.1);
    } else {
      // Glide to the focused location (slightly left of centre, gently breathing)
      const target = rotationToFace(focus.lat, focus.lng);
      const drift = reduced ? 0 : Math.sin(clock.elapsedTime * 0.25) * 0.06;
      const k = 1 - Math.exp(-dt * 2.2);
      r.y += shortestAngle(r.y, target.y - 0.32 + drift) * k;
      r.x += (THREE.MathUtils.clamp(target.x * 0.75, -0.9, 0.9) + 0.12 - r.x) * k;
    }
    g.rotation.set(r.x, r.y, 0, "XYZ");
    g.updateMatrixWorld();

    // Pin DOM markers to their projected screen position; fade them out over the horizon
    for (const a of anchors) {
      const el = markerEls.current[a.id];
      if (!el) continue;
      tmp.copy(a.local).applyMatrix4(g.matrixWorld);
      normal.copy(tmp).normalize();
      const facing = toCam.copy(camera.position).sub(tmp).normalize().dot(normal);
      const o = THREE.MathUtils.smoothstep(facing, 0.05, 0.3);
      tmp.project(camera);
      const x = (tmp.x * 0.5 + 0.5) * size.width;
      const y = (-tmp.y * 0.5 + 0.5) * size.height;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      el.style.opacity = o.toFixed(3);
      el.style.visibility = o < 0.01 ? "hidden" : "visible";
      el.style.pointerEvents = o > 0.5 ? "auto" : "none";
      el.style.zIndex = String(Math.round(facing * 100));
    }
  });

  return (
    <group ref={globe}>
      <mesh>
        <sphereGeometry args={[1, 96, 96]} />
        <shaderMaterial vertexShader={bodyVertex} fragmentShader={bodyFragment} uniforms={{ uRim: { value: AQUA } }} />
      </mesh>
      <points geometry={dots}>
        <shaderMaterial
          vertexShader={dotVertex}
          fragmentShader={dotFragment}
          uniforms={dotUniforms}
          transparent
          depthWrite={false}
        />
      </points>
      <Arcs home={home} markers={markers} />
      <HomeBeacon lat={home.lat} lng={home.lng} />
    </group>
  );
}

function Halo() {
  return (
    <mesh scale={1.14}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={haloVertex}
        fragmentShader={haloFragment}
        uniforms={{ uColor: { value: AQUA } }}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function Globe({ active, ...props }: Props) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 3.7], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <Halo />
      <Scene {...props} />
    </Canvas>
  );
}
