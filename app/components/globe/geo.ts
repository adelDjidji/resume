import * as THREE from "three";
import { LAND_MASK_B64, LAND_MASK_HEIGHT, LAND_MASK_WIDTH } from "@/app/lib/landMask";

const DEG = Math.PI / 180;

/** Lat/lng (degrees) to a point on a sphere; +x faces lng 0, +y is north. */
export function latLngToVector3(lat: number, lng: number, radius = 1) {
  const phi = (90 - lat) * DEG;
  const theta = (lng + 180) * DEG;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Globe rotation (y, then x) that brings lat/lng to face a camera on +z. */
export function rotationToFace(lat: number, lng: number) {
  const v = latLngToVector3(lat, lng);
  return { y: -Math.atan2(v.x, v.z), x: lat * DEG };
}

let mask: Uint8Array | null = null;
function isLand(lat: number, lng: number) {
  if (!mask) mask = Uint8Array.from(atob(LAND_MASK_B64), (c) => c.charCodeAt(0));
  const row = Math.min(LAND_MASK_HEIGHT - 1, Math.max(0, Math.floor(90 - lat)));
  const col = (((Math.floor(lng + 180) % LAND_MASK_WIDTH) + LAND_MASK_WIDTH) % LAND_MASK_WIDTH);
  const i = row * LAND_MASK_WIDTH + col;
  return (mask[i >> 3] & (1 << (i & 7))) !== 0;
}

/** Evenly distributed (Fibonacci) points on the sphere, kept only over land. */
export function landDots(samples: number, radius = 1) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const out: number[] = [];
  for (let i = 0; i < samples; i++) {
    const y = 1 - ((i + 0.5) / samples) * 2;
    const lat = Math.asin(y) / DEG;
    const lng = ((((i * golden) / DEG) % 360) + 360) % 360 - 180;
    if (!isLand(lat, lng)) continue;
    const v = latLngToVector3(lat, lng, radius);
    out.push(v.x, v.y, v.z);
  }
  return new Float32Array(out);
}

/** Great-circle-ish arc lifted above the surface, sampled into points. */
export function arcPoints(from: THREE.Vector3, to: THREE.Vector3, segments = 64) {
  const dist = from.distanceTo(to);
  const mid = from.clone().add(to).normalize().multiplyScalar(1 + dist * 0.35);
  const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
  return curve.getPoints(segments);
}
