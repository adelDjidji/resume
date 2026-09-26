"use client";

import { useState } from "react";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^[A-Za-zÀ-ÿ]/.test(w))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

type Props = {
  name: string;
  src?: string;
  size?: number;
  className?: string;
  contain?: boolean;
};

/**
 * Remote avatar/logo that degrades to an elegant monogram when the image is
 * missing or the (often short-lived) remote URL has expired.
 */
export default function Avatar({ name, src, size = 48, className = "", contain = false }: Props) {
  const [failed, setFailed] = useState(!src);

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      {failed ? (
        <span
          aria-hidden
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-mint to-aqua font-mono font-bold text-ink"
          style={{ fontSize: size * 0.42 }}
        >
          {initials(name)}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- arbitrary remote hosts, needs onError fallback
        <img
          src={src}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className={`h-full w-full ${contain ? "bg-white object-contain p-1.5" : "object-cover"}`}
        />
      )}
    </span>
  );
}
