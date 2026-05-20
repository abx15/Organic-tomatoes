import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import tomatoTex from "../assets/tomato-hero.jpg";
import { useReducedMotionPref } from "./MotionContext";

function Tomato({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRot = useRef({ x: 0, y: 0 });
  const tex = useLoader(THREE.TextureLoader, tomatoTex);
  tex.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    if (reduced) {
      // gentle constant idle spin only, no pointer-driven motion
      g.rotation.y += 0.0015;
      return;
    }
    const { x, y } = state.pointer;
    targetRot.current.y = x * 0.6;
    targetRot.current.x = -y * 0.4;
    g.rotation.x += (targetRot.current.x - g.rotation.x) * 0.06;
    g.rotation.y += (targetRot.current.y - g.rotation.y) * 0.06;
  });

  return (
    <Float speed={reduced ? 0 : 1.4} rotationIntensity={reduced ? 0 : 0.4} floatIntensity={reduced ? 0 : 0.8}>
      <group ref={groupRef}>
        <mesh castShadow>
          <sphereGeometry args={[1, 96, 96]} />
          <meshPhysicalMaterial
            map={tex}
            roughness={0.25}
            clearcoat={0.8}
            clearcoatRoughness={0.18}
            sheen={0.4}
            sheenColor={new THREE.Color("#ff8a65")}
          />
        </mesh>
        <group position={[0, 0.92, 0]}>
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (i / 5) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(a) * 0.18, 0, Math.sin(a) * 0.18]} rotation={[0.4, a, 0]}>
                <coneGeometry args={[0.08, 0.35, 6]} />
                <meshStandardMaterial color="#2E7D32" roughness={0.6} />
              </mesh>
            );
          })}
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.25, 8]} />
            <meshStandardMaterial color="#3E2723" roughness={0.7} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function Rig({ reduced }: { reduced: boolean }) {
  useFrame((state, delta) => {
    const { camera, pointer } = state;
    if (reduced) {
      camera.position.x += (0 - camera.position.x) * delta * 1.2;
      camera.position.y += (0.1 - camera.position.y) * delta * 1.2;
    } else {
      camera.position.x += (pointer.x * 0.6 - camera.position.x) * delta * 1.2;
      camera.position.y += (-pointer.y * 0.4 + 0.1 - camera.position.y) * delta * 1.2;
    }
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function TomatoModel() {
  const { reduced } = useReducedMotionPref();
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.1, 3.4], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 2]} intensity={1.6} color="#FFE6C7" />
        <directionalLight position={[-3, -1, -2]} intensity={0.6} color="#FF7043" />
        <pointLight position={[0, 0, 3]} intensity={0.4} color="#ffffff" />
        <Tomato reduced={reduced} />
        <Environment preset="sunset" />
        <Rig reduced={reduced} />
      </Suspense>
    </Canvas>
  );
}
