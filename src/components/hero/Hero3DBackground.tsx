"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { GlyphEye, GlyphLayers, GlyphRotate } from "@/components/ui/TechnicalGlyphs";

interface Hero3DBackgroundProps {
  className?: string;
  showControls?: boolean;
}

export const Hero3DBackground: React.FC<Hero3DBackgroundProps> = ({
  className,
  showControls = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState(false);
  const [explodeOffset, setExplodeOffset] = useState(0); // 0 to 1
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const explodeRef = useRef(0);
  const wireframeRef = useRef(false);
  const autoRotateRef = useRef(true);

  explodeRef.current = explodeOffset;
  wireframeRef.current = wireframe;
  autoRotateRef.current = autoRotate;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip heavy WebGL on small mobile viewports to ensure 0ms TBT and 120Hz native compositor performance
    if (window.innerWidth < 640) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 11.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.appendChild(renderer.domElement);

    // --- Lighting Setup (Dramatic Crisp Studio) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Master Key Light for Edge Highlights (Optimized 1024 shadow map)
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
    keyLight.position.set(8, 10, 9);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Cool High-End Cyan-Ice Rim Light
    const rimLight = new THREE.DirectionalLight(0xdbeafe, 2.8);
    rimLight.position.set(-9, -4, -6);
    scene.add(rimLight);

    // Subtle Fill Light
    const fillLight = new THREE.PointLight(0xffffff, 1.4, 40, 2);
    fillLight.position.set(-5, 4, 8);
    scene.add(fillLight);

    // Bottom Subtle Uplight
    const bottomLight = new THREE.PointLight(0xe4e4e7, 1.8, 30, 2);
    bottomLight.position.set(0, -6, 6);
    scene.add(bottomLight);

    // --- Diamond Geometry Builders ---
    function diamondOutline(r: number) {
      const shape = new THREE.Shape();
      shape.moveTo(0, r);
      shape.lineTo(r, 0);
      shape.lineTo(0, -r);
      shape.lineTo(-r, 0);
      shape.closePath();
      return shape;
    }

    function frameGeometry(outerR: number, innerR: number, depth: number) {
      const shape = diamondOutline(outerR);
      shape.holes.push(diamondOutline(innerR));
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
    }

    function solidGeometry(r: number, depth: number) {
      const shape = diamondOutline(r);
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
    }

    const RING_DEPTH = 0.20;

    // High-Precision MeshPhysicalMaterial (Monochromatic Glossy Ceramic)
    const glossMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.2,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      reflectivity: 0.6,
      ior: 1.52,
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });

    interface DiamondLogoGroup {
      group: THREE.Group;
      outer: THREE.Mesh;
      middle: THREE.Mesh;
      core: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      baseScale: number;
      rotSpeedX: number;
      rotSpeedY: number;
      bobSpeed: number;
      bobOffset: number;
    }

    function buildDiamondLogo(scale: number): DiamondLogoGroup {
      const group = new THREE.Group();

      // Outer Diamond Ring
      const outer = new THREE.Mesh(
        frameGeometry(1.12, 0.8, RING_DEPTH),
        glossMaterial
      );
      outer.position.z = -0.2;
      outer.castShadow = outer.receiveShadow = true;

      // Middle Diamond Ring
      const middle = new THREE.Mesh(
        frameGeometry(0.66, 0.42, RING_DEPTH),
        glossMaterial
      );
      middle.position.z = 0;
      middle.castShadow = middle.receiveShadow = true;

      // Core Solid Diamond
      const core = new THREE.Mesh(
        solidGeometry(0.25, RING_DEPTH),
        glossMaterial
      );
      core.position.z = 0.2;
      core.castShadow = core.receiveShadow = true;

      group.add(outer, middle, core);
      group.scale.setScalar(scale);

      return {
        group,
        outer,
        middle,
        core,
        baseX: 0,
        baseY: 0,
        baseZ: 0,
        baseScale: scale,
        rotSpeedX: (Math.random() - 0.5) * 0.04,
        rotSpeedY: (Math.random() - 0.5) * 0.1 + 0.08,
        bobSpeed: 0.65 + Math.random() * 0.35,
        bobOffset: Math.random() * Math.PI * 2,
      };
    }

    // Positions matching the user's sketch (Top-Left, Top-Right, Bottom-Center surrounding header)
    const basePositions = [
      // 1. TOP-LEFT DIAMOND (Floating above-left of headline)
      { x: -5.2, y: 2.3, z: -0.6, scale: 1.05, rotY: 0.38, rotX: 0.12, rotSpeedY: 0.09 },
      // 2. TOP-RIGHT DIAMOND (Floating above-right of headline)
      { x: 5.2, y: 1.9, z: -0.5, scale: 1.12, rotY: -0.42, rotX: -0.08, rotSpeedY: -0.08 },
      // 3. BOTTOM DIAMOND (Floating lower center / under the header CTAs)
      { x: 0.1, y: -2.75, z: 0.4, scale: 0.98, rotY: 0.15, rotX: 0.18, rotSpeedY: 0.07 },
    ];

    const logoInstances: DiamondLogoGroup[] = basePositions.map((pos) => {
      const item = buildDiamondLogo(pos.scale);
      item.baseX = pos.x;
      item.baseY = pos.y;
      item.baseZ = pos.z;
      item.rotSpeedY = pos.rotSpeedY;
      item.group.position.set(pos.x, pos.y, pos.z);
      item.group.rotation.set(pos.rotX, pos.rotY, 0);
      scene.add(item.group);
      return item;
    });

    // --- Dynamic Responsive Positioning ---
    const updateResponsiveLayout = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const aspect = width / height;

      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Adjust diamond spread based on screen width
      if (width < 640) {
        // Mobile layout: spread them wider / push top and bottom further so text is unobstructed
        logoInstances[0].group.position.x = -2.8;
        logoInstances[0].group.position.y = 3.6;
        logoInstances[0].group.scale.setScalar(0.72);

        logoInstances[1].group.position.x = 2.8;
        logoInstances[1].group.position.y = 3.2;
        logoInstances[1].group.scale.setScalar(0.75);

        logoInstances[2].group.position.x = 0;
        logoInstances[2].group.position.y = -3.8;
        logoInstances[2].group.scale.setScalar(0.7);
        camera.position.z = 13.5;
      } else if (width < 1024) {
        // Tablet layout
        logoInstances[0].group.position.x = -4.2;
        logoInstances[0].group.position.y = 2.8;
        logoInstances[0].group.scale.setScalar(0.88);

        logoInstances[1].group.position.x = 4.2;
        logoInstances[1].group.position.y = 2.4;
        logoInstances[1].group.scale.setScalar(0.92);

        logoInstances[2].group.position.x = 0.1;
        logoInstances[2].group.position.y = -3.1;
        logoInstances[2].group.scale.setScalar(0.85);
        camera.position.z = 12.2;
      } else {
        // Desktop layout (Spacious and dramatic framing around the header)
        logoInstances[0].group.position.x = logoInstances[0].baseX;
        logoInstances[0].group.position.y = logoInstances[0].baseY;
        logoInstances[0].group.scale.setScalar(logoInstances[0].baseScale);

        logoInstances[1].group.position.x = logoInstances[1].baseX;
        logoInstances[1].group.position.y = logoInstances[1].baseY;
        logoInstances[1].group.scale.setScalar(logoInstances[1].baseScale);

        logoInstances[2].group.position.x = logoInstances[2].baseX;
        logoInstances[2].group.position.y = logoInstances[2].baseY;
        logoInstances[2].group.scale.setScalar(logoInstances[2].baseScale);
        camera.position.z = 11.5;
      }
    };

    updateResponsiveLayout();
    window.addEventListener("resize", updateResponsiveLayout);

    // --- Interactive Mouse & Parallax Controls ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const drag = { isDown: false, prevX: 0, prevY: 0, rotX: 0, rotY: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouse.targetX = x * 0.75;
      mouse.targetY = y * 0.45;

      if (drag.isDown) {
        const deltaX = e.clientX - drag.prevX;
        const deltaY = e.clientY - drag.prevY;
        drag.rotY += deltaX * 0.004;
        drag.rotX += deltaY * 0.004;
        drag.rotX = Math.max(-0.35, Math.min(0.35, drag.rotX));
        drag.prevX = e.clientX;
        drag.prevY = e.clientY;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      drag.isDown = true;
      drag.prevX = e.clientX;
      drag.prevY = e.clientY;
      setIsDragging(true);
    };

    const handlePointerUp = () => {
      drag.isDown = false;
      setIsDragging(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    // --- Render Loop with Viewport Visibility Observer ---
    const clock = new THREE.Clock();
    let animationFrameId = 0;
    let isVisibleInViewport = true;

    const animate = () => {
      if (!isVisibleInViewport) return;
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      camera.position.x = mouse.x * 1.5 + drag.rotY * 1.8;
      camera.position.y = mouse.y * 0.9 - drag.rotX * 1.8;
      camera.lookAt(0, 0, 0);

      const currentExplode = explodeRef.current;
      const currentWireframe = wireframeRef.current;
      const isAutoRotating = autoRotateRef.current;

      logoInstances.forEach((item) => {
        // Material switch
        const mat = currentWireframe ? wireframeMaterial : glossMaterial;
        item.outer.material = mat;
        item.middle.material = mat;
        item.core.material = mat;

        // Explode layer z-spacing
        item.outer.position.z = -0.2 - currentExplode * 1.35;
        item.core.position.z = 0.2 + currentExplode * 1.35;

        // Organic floating oscillation
        const bob = Math.sin(t * item.bobSpeed + item.bobOffset) * 0.16;
        item.group.position.y = (item.baseY || item.group.position.y) + bob;

        // Subtle dynamic tilt response to mouse
        item.group.rotation.x += (mouse.y * 0.08 - item.group.rotation.x * 0.02) * 0.05;

        // Continuous rotation
        if (isAutoRotating) {
          item.group.rotation.y += item.rotSpeedY * 0.014;
        }
      });

      renderer.render(scene, camera);
    };

    // IntersectionObserver to pause loop when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleInViewport = entry.isIntersecting;
        if (isVisibleInViewport) {
          clock.start();
          if (!animationFrameId) {
            animate();
          }
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = 0;
          }
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    animate();

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("resize", updateResponsiveLayout);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointerdown", handlePointerDown);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={cn("absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-auto", className)}>
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className={cn(
          "absolute inset-0 w-full h-full",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
      />

      {/* Subtle Ambient Radial Lighting Behind Center Text */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0.55) 0%, rgba(3,3,3,0.78) 55%, rgba(3,3,3,0.95) 100%)",
        }}
      />

      {/* Floating Minimalist 3D HUD & Controls (Discreet Pill at the Bottom) */}
      {showControls && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-auto">
          <div className="flex items-center gap-1 sm:gap-2 rounded-full border border-white/12 bg-black/75 px-3 sm:px-4 py-1.5 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-2 pr-2 border-r border-white/10 hidden sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                3D Background
              </span>
            </div>

            {/* Auto Rotate Toggle */}
            <button
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-mono transition-all",
                autoRotate
                  ? "bg-white text-black font-semibold shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <GlyphRotate className={cn("h-3 w-3", autoRotate && "animate-spin")} />
              <span>{autoRotate ? "Rotasi On" : "Rotasi Off"}</span>
            </button>

            {/* Wireframe Mode */}
            <button
              type="button"
              onClick={() => setWireframe(!wireframe)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-mono transition-all",
                wireframe
                  ? "bg-white text-black font-semibold shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <GlyphEye className="h-3 w-3" />
              <span>Wireframe</span>
            </button>

            {/* Explode Layers */}
            <button
              type="button"
              onClick={() => setExplodeOffset(explodeOffset > 0 ? 0 : 0.85)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-mono transition-all",
                explodeOffset > 0
                  ? "bg-white text-black font-semibold shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <GlyphLayers className="h-3 w-3" />
              <span>{explodeOffset > 0 ? "Satukan" : "Explode"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
