import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, Suspense, useState } from "react";
import * as THREE from "three";
import { useReducedMotionPref } from "./MotionContext";

type Props = {
  count?: number;
  tint?: string;
  className?: string;
  variant?: "leaves" | "embers";
};

function Particles({ count, tint, variant }: { count: number; tint: string; variant: "leaves" | "embers" }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 12,
      y: (Math.random() - 0.5) * 7,
      z: (Math.random() - 0.5) * 4,
      sp: 0.15 + Math.random() * 0.35,
      ph: Math.random() * Math.PI * 2,
      sc: 0.05 + Math.random() * 0.12,
      rot: Math.random() * Math.PI,
    }));
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const m = meshRef.current;
    if (!m) return;
    const { x: px, y: py } = state.pointer;
    data.forEach((d, i) => {
      const drift = Math.sin(t * d.sp + d.ph) * 0.6;
      const fall = ((t * d.sp * 0.4 + d.ph) % 4) - 2;
      dummy.position.set(
        d.x + drift + px * 0.3 * (d.z / 2),
        d.y - fall + py * 0.2 * (d.z / 2),
        d.z
      );
      dummy.rotation.z = d.rot + t * d.sp * 0.5;
      dummy.scale.setScalar(d.sc);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  const color = new THREE.Color(tint);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {variant === "leaves" ? (
        <planeGeometry args={[1, 1.6]} />
      ) : (
        <sphereGeometry args={[0.5, 12, 12]} />
      )}
      <meshBasicMaterial color={color} transparent opacity={variant === "embers" ? 0.55 : 0.7} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

export default function DepthLayer({
  count = 28,
  tint = "#A5D6A7",
  className = "",
  variant = "leaves",
}: Props) {
  const { reduced } = useReducedMotionPref();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (reduced || !mounted) {
    return (
      <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="floaty absolute h-1.5 w-1.5 rounded-full opacity-50"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              background: tint,
              animationDelay: `${-i * 0.7}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <Canvas
        dpr={[1, 1.4]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Particles count={count} tint={tint} variant={variant} />
        </Suspense>
      </Canvas>
    </div>
  );
}
