"use client";

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export type Hero3DMode = "float" | "explode" | "wireframe";

export interface Hero3DCanvasRef {
  setMode: (mode: Hero3DMode) => void;
  pulseSurge: () => void;
  resetView: () => void;
}

interface Hero3DCanvasProps {
  className?: string;
  initialMode?: Hero3DMode;
  onModeChange?: (mode: Hero3DMode) => void;
}

export const Hero3DCanvas = forwardRef<Hero3DCanvasRef, Hero3DCanvasProps>(
  ({ className = "", initialMode = "float", onModeChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentMode, setCurrentMode] = useState<Hero3DMode>(initialMode);
    const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

    // Mode state refs for render loop
    const modeRef = useRef<Hero3DMode>(initialMode);
    const explodeProgressRef = useRef(0);
    const surgePulseRef = useRef(0);

    modeRef.current = currentMode;

    // Diamond geometric helper (rhombus)
    const buildDiamondShape = (radius: number) => {
      const shape = new THREE.Shape();
      shape.moveTo(0, radius);
      shape.lineTo(radius, 0);
      shape.lineTo(0, -radius);
      shape.lineTo(-radius, 0);
      shape.closePath();
      return shape;
    };

    const buildFrameGeometry = (outerR: number, innerR: number, depth: number) => {
      const shape = buildDiamondShape(outerR);
      shape.holes.push(buildDiamondShape(innerR));
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 1,
        curveSegments: 1,
      });
      geo.center();
      return geo;
    };

    const buildSolidGeometry = (radius: number, depth: number) => {
      const shape = buildDiamondShape(radius);
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 1,
        curveSegments: 1,
      });
      geo.center();
      return geo;
    };

    useImperativeHandle(ref, () => ({
      setMode: (mode: Hero3DMode) => {
        setCurrentMode(mode);
        if (onModeChange) onModeChange(mode);
      },
      pulseSurge: () => {
        surgePulseRef.current = 1.0;
      },
      resetView: () => {
        setCurrentMode("float");
        if (onModeChange) onModeChange("float");
      },
    }));

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      // 1. Scene & Camera
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);

      const camera = new THREE.PerspectiveCamera(
        42,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 0, 8.2);

      // 2. High-Performance Renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      container.appendChild(renderer.domElement);

      // 3. Lighting (Monochrome Crisp Studio Rig)
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
      keyLight.position.set(6, 8, 7);
      keyLight.castShadow = true;
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 2.5);
      rimLight.position.set(-6, -4, -5);
      scene.add(rimLight);

      const frontLight = new THREE.PointLight(0xffffff, 1.4, 25);
      frontLight.position.set(0, 0, 6);
      scene.add(frontLight);

      // 4. Materials (High-Craft Obsidian Gloss & Solid Wireframe)
      const solidMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.15,
        roughness: 0.2,
        clearcoat: 0.9,
        clearcoatRoughness: 0.15,
        reflectivity: 0.8,
      });

      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
      });

      // 5. Build Layered Monolith Group
      const monolithGroup = new THREE.Group();
      scene.add(monolithGroup);

      const DEPTH = 0.22;

      // Layer 1: Outer Rhombus Arch
      const outerMesh = new THREE.Mesh(
        buildFrameGeometry(1.9, 1.45, DEPTH),
        solidMaterial
      );
      outerMesh.castShadow = true;
      outerMesh.receiveShadow = true;
      monolithGroup.add(outerMesh);

      // Layer 2: Mid Concentric Ring
      const midMesh = new THREE.Mesh(
        buildFrameGeometry(1.15, 0.82, DEPTH),
        solidMaterial
      );
      midMesh.castShadow = true;
      midMesh.receiveShadow = true;
      monolithGroup.add(midMesh);

      // Layer 3: Core Solid Nucleus
      const coreMesh = new THREE.Mesh(
        buildSolidGeometry(0.48, DEPTH),
        solidMaterial
      );
      coreMesh.castShadow = true;
      coreMesh.receiveShadow = true;
      monolithGroup.add(coreMesh);

      // Mouse & Orientation Trackers
      const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
      const currentRotation = { x: 0, y: 0 };

      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

        mouse.targetX = normX;
        mouse.targetY = normY;
        setMouseCoords({ x: Math.round(normX * 100), y: Math.round(normY * 100) });
      };

      const handlePointerLeave = () => {
        mouse.targetX = 0;
        mouse.targetY = 0;
        setMouseCoords({ x: 0, y: 0 });
      };

      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerleave", handlePointerLeave);

      // 6. Resize handler
      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      // 7. Render Loop with Clock
      const clock = new THREE.Clock();
      let animId = 0;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse damping
        mouse.x += (mouse.targetX - mouse.x) * 0.06;
        mouse.y += (mouse.targetY - mouse.y) * 0.06;

        // Base Idle Wobble
        const idleRotX = Math.sin(elapsedTime * 0.8) * 0.08;
        const idleRotY = Math.cos(elapsedTime * 0.6) * 0.12;

        const mode = modeRef.current;

        // Handle Material Wireframe Toggle
        solidMaterial.wireframe = mode === "wireframe";

        // Handle Explode Animation (interpolate smoothly)
        const targetExplode = mode === "explode" ? 1.0 : 0.0;
        explodeProgressRef.current += (targetExplode - explodeProgressRef.current) * 0.08;
        const exp = explodeProgressRef.current;

        // Layer Z-offsets & Rotation offsets
        outerMesh.position.z = -exp * 0.7;
        midMesh.position.z = 0;
        coreMesh.position.z = exp * 0.8;

        outerMesh.rotation.z = -exp * 0.25;
        midMesh.rotation.z = exp * 0.2;

        // Energy pulse surge decay
        if (surgePulseRef.current > 0.001) {
          surgePulseRef.current *= 0.92;
          const scaleSurge = 1 + surgePulseRef.current * 0.25;
          coreMesh.scale.setScalar(scaleSurge);
        } else {
          coreMesh.scale.setScalar(1);
        }

        // Rotational targeting with mouse tilt
        currentRotation.x += ((mouse.y * 0.5 + idleRotX) - currentRotation.x) * 0.06;
        currentRotation.y += ((mouse.x * 0.8 + idleRotY) - currentRotation.y) * 0.06;

        monolithGroup.rotation.x = currentRotation.x;
        monolithGroup.rotation.y = currentRotation.y;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", handleResize);
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerleave", handlePointerLeave);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }, []);

    return (
      <div className={cn("relative w-full h-[460px] sm:h-[520px] box-sharp bg-black overflow-hidden select-none", className)}>
        {/* Technical Corner Brackets */}
        <span className="corner-tl" />
        <span className="corner-tr" />
        <span className="corner-bl" />
        <span className="corner-br" />

        {/* 3D WebGL Canvas Viewport */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Top Header HUD Metadata */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
          <div className="flex items-center gap-2 border border-white/20 bg-black px-2.5 py-1 font-mono text-[10px] tracking-wider text-white uppercase">
            <span className="h-1.5 w-1.5 rounded-none bg-white" />
            <span>SYS.3D // MONOLITH-01</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-500 hidden sm:inline-block">
            TILT: [{mouseCoords.x}, {mouseCoords.y}]
          </span>
        </div>

        {/* Top Right FPS & Engine Indicator */}
        <div className="absolute top-4 right-4 z-20 font-mono text-[10px] text-zinc-400 border border-white/10 bg-black px-2 py-0.5">
          WEBGL 2.0 · 60 FPS
        </div>

        {/* Bottom Interactive Control Switcher (Solid Rectangular Buttons) */}
        <div className="absolute bottom-4 inset-x-4 z-20 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setCurrentMode("float");
                if (onModeChange) onModeChange("float");
              }}
              className={cn(
                "px-3 py-1 font-mono text-[10px] uppercase tracking-wider border transition-all",
                currentMode === "float"
                  ? "bg-white text-black font-bold border-white"
                  : "bg-black text-zinc-400 border-white/20 hover:text-white hover:border-white/40"
              )}
            >
              [ 01 ] Float
            </button>

            <button
              onClick={() => {
                setCurrentMode("explode");
                if (onModeChange) onModeChange("explode");
              }}
              className={cn(
                "px-3 py-1 font-mono text-[10px] uppercase tracking-wider border transition-all",
                currentMode === "explode"
                  ? "bg-white text-black font-bold border-white"
                  : "bg-black text-zinc-400 border-white/20 hover:text-white hover:border-white/40"
              )}
            >
              [ 02 ] Explode
            </button>

            <button
              onClick={() => {
                setCurrentMode("wireframe");
                if (onModeChange) onModeChange("wireframe");
              }}
              className={cn(
                "px-3 py-1 font-mono text-[10px] uppercase tracking-wider border transition-all",
                currentMode === "wireframe"
                  ? "bg-white text-black font-bold border-white"
                  : "bg-black text-zinc-400 border-white/20 hover:text-white hover:border-white/40"
              )}
            >
              [ 03 ] Wireframe
            </button>
          </div>

          <button
            onClick={() => {
              surgePulseRef.current = 1.0;
            }}
            className="px-3 py-1 font-mono text-[10px] uppercase tracking-wider border border-white/20 bg-black text-zinc-300 hover:bg-white hover:text-black transition-all"
          >
            Pulse Surge ↗
          </button>
        </div>
      </div>
    );
  }
);

Hero3DCanvas.displayName = "Hero3DCanvas";
