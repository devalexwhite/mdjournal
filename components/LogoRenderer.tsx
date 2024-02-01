"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import LogoMesh from "./LogoMesh";
import { OrbitControls } from "@react-three/drei";

export default function LogoRenderer() {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [1, 0, 5.25], fov: 14 }}
    >
      <ambientLight intensity={6} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={10} />
      <Suspense fallback={null}>
        <LogoMesh />
      </Suspense>
      <OrbitControls
        enableRotate={true}
        enablePan={false}
        enableZoom={false}
        autoRotate={true}
        autoRotateSpeed={4}
      />
    </Canvas>
  );
}
