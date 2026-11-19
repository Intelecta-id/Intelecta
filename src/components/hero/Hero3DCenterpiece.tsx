"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

// Procedural Particle Halo orbiting the centerpiece
function ParticleHalo({ count = 90 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      sc[i] = Math.random() * 0.04 + 0.02;
    }
    return [pos, sc];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08;
      pointsRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ffffff"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Intelecta Signature Multi-Layer Diamond Monolith
function DiamondArchitecturalMonolith({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const outerWireframeRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth inertia tracking cursor
    const targetX = mouse.current.y * 0.45;
    const targetY = mouse.current.x * 0.65 + state.clock.elapsedTime * 0.12;

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetX,
      4,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetY,
      4,
      delta
    );

    // Counter-rotation on inner core for mechanical precision
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = -state.clock.elapsedTime * 0.35;
      innerCoreRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }

    if (outerWireframeRef.current) {
      outerWireframeRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.6}>
        {/* Layer 1: Outer Architectural Wireframe Cage */}
        <mesh ref={outerWireframeRef}>
          <octahedronGeometry args={[2.3, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            wireframe
            roughness={0.1}
            metalness={0.95}
            emissive="#ffffff"
            emissiveIntensity={0.18}
          />
        </mesh>

        {/* Layer 2: Refractive Glass Monolith with Chromatic Aberration */}
        <mesh>
          <octahedronGeometry args={[2.05, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={1.4}
            roughness={0.06}
            chromaticAberration={0.35}
            anisotropy={0.3}
            distortion={0.25}
            distortionScale={0.3}
            temporalDistortion={0.05}
            color="#ffffff"
            attenuationDistance={1.2}
            attenuationColor="#d4d4d8"
          />
        </mesh>

        {/* Layer 3: Solid Glossy Obsidian Core Diamond */}
        <mesh ref={innerCoreRef}>
          <octahedronGeometry args={[0.95, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.15}
            metalness={0.9}
            emissive="#ffffff"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Ambient Orbiting Particles */}
        <ParticleHalo count={100} />
      </Float>
    </group>
  );
}

export const Hero3DCenterpiece: React.FC = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouse.current.x = x;
    mouse.current.y = y;
  };

  const handlePointerLeave = () => {
    mouse.current.x = 0;
    mouse.current.y = 0;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex items-center justify-center w-full max-w-[480px] lg:max-w-[540px] aspect-square select-none group"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] via-zinc-500/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* React Three Fiber Canvas */}
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 8, 6]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-6, -4, -4]} intensity={1.2} color="#a1a1aa" />
        <pointLight position={[0, -2, 3]} intensity={1} color="#ffffff" />

        <DiamondArchitecturalMonolith mouse={mouse} />
      </Canvas>
    </div>
  );
};
