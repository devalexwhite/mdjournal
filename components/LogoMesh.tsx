"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function LogoMesh(props: any) {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/mdjournal_logo.glb"
  );
  return (
    <group {...props} dispose={null}>
      <group
        position={[-0.033, 0.008, -0.039]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.08}
      >
        <mesh
          geometry={nodes.Plane002_1.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          geometry={nodes.Plane002_2.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          geometry={nodes.Plane002_3.geometry}
          material={materials["Material.002"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/mdjournal_logo.glb");
