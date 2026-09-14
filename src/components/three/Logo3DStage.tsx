"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { GlyphEye, GlyphLayers, GlyphRotate } from "@/components/ui/TechnicalGlyphs";

interface Logo3DStageProps {
  className?: string;
  showControls?: boolean;
}

export const Logo3DStage: React.FC<Logo3DStageProps> = ({
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

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.3, 10.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // --- Lighting Setup ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    // Master Key Light for Crisp Reflections (Optimized 1024 shadow map)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.6);
    keyLight.position.set(7, 9, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -10;
    keyLight.shadow.camera.right = 10;
    keyLight.shadow.camera.top = 10;
    keyLight.shadow.camera.bottom = -10;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Cool High-End Rim Light
    const rimLight = new THREE.DirectionalLight(0xdbeafe, 2.0);
    rimLight.position.set(-8, -2, -6);
    scene.add(rimLight);

    // Studio Fill Point Light
    const fillLight = new THREE.PointLight(0xffffff, 1.2, 35, 2);
    fillLight.position.set(-4, -3, 8);
    scene.add(fillLight);

    // Dedicated Overhead Spotlight for the Top Master Logo
    const beamLight = new THREE.SpotLight(0xffffff, 4.5, 28, Math.PI / 5, 0.45, 1);
    beamLight.position.set(0, 9, 2);
    beamLight.target.position.set(0, 1.4, 0);
    scene.add(beamLight);
    scene.add(beamLight.target);

    // --- Soft Studio Contact Floor ---
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.38 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(250, 250), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3.2;
    floor.receiveShadow = true;
    scene.add(floor);

    // --- Diamond Geometry Helpers ---
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
        bevelThickness: 0.015,
        bevelSize: 0.015,
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
        bevelThickness: 0.015,
        bevelSize: 0.015,
        bevelSegments: 1,
        curveSegments: 1,
      });
      geo.center();
      return geo;
    }

    const RING_DEPTH = 0.18;

    // High-Precision MeshPhysicalMaterial (Monochromatic Glossy Ceramic/Obsidian Look)
    const glossMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.06,
      roughness: 0.22,
      clearcoat: 0.85,
      clearcoatRoughness: 0.18,
      reflectivity: 0.55,
      ior: 1.5,
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
      baseY: number;
      spin: number;
      bobOffset: number;
    }

    function buildDiamondLogo(scale: number): DiamondLogoGroup {
      const group = new THREE.Group();

      // Outer Diamond Ring
      const outer = new THREE.Mesh(
        frameGeometry(1.08, 0.78, RING_DEPTH),
        glossMaterial
      );
      outer.position.z = -0.18;
      outer.castShadow = outer.receiveShadow = true;

      // Middle Diamond Ring
      const middle = new THREE.Mesh(
        frameGeometry(0.64, 0.40, RING_DEPTH),
        glossMaterial
      );
      middle.position.z = 0;
      middle.castShadow = middle.receiveShadow = true;

      // Core Solid Diamond
      const core = new THREE.Mesh(
        solidGeometry(0.24, RING_DEPTH),
        glossMaterial
      );
      core.position.z = 0.18;
      core.castShadow = core.receiveShadow = true;

      group.add(outer, middle, core);
      group.scale.setScalar(scale);

      const spin = (Math.random() - 0.5) * 0.12 + 0.09;
      const bobOffset = Math.random() * Math.PI * 2;

      return { group, outer, middle, core, baseY: 0, spin, bobOffset };
    }

    // Trio Constellation Layout: Master Center Top, Left Node, Right Node
    const spots = [
      { position: new THREE.Vector3(0, 1.45, -0.4), rotationY: 0, scale: 1.22 },      // Center Master
      { position: new THREE.Vector3(-4.5, -0.65, 0.5), rotationY: 0.36, scale: 0.92 }, // Left Satellite
      { position: new THREE.Vector3(4.5, -0.65, 0.5), rotationY: -0.36, scale: 0.92 },  // Right Satellite
    ];

    const logoInstances: DiamondLogoGroup[] = spots.map((spot) => {
      const instance = buildDiamondLogo(spot.scale);
      instance.group.position.copy(spot.position);
      instance.group.rotation.y = spot.rotationY;
      instance.baseY = spot.position.y;
      scene.add(instance.group);
      return instance;
    });

    // --- Interactive Mouse & Drag Controls ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const drag = { isDown: false, prevX: 0, prevY: 0, rotX: 0, rotY: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouse.targetX = x * 0.8;
      mouse.targetY = y * 0.5;

      if (drag.isDown) {
        const deltaX = e.clientX - drag.prevX;
        const deltaY = e.clientY - drag.prevY;
        drag.rotY += deltaX * 0.005;
        drag.rotX += deltaY * 0.005;
        drag.rotX = Math.max(-0.4, Math.min(0.4, drag.rotX));
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

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // --- Animation Loop with IntersectionObserver ---
    const clock = new THREE.Clock();
    let animationFrameId = 0;
    let isVisibleInViewport = true;

    const animate = () => {
      if (!isVisibleInViewport) return;
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x = mouse.x * 1.4 + drag.rotY * 2.0;
      camera.position.y = 0.3 + mouse.y * 0.9 - drag.rotX * 2.0;
      camera.lookAt(0, 0.35, 0);

      // Update Logos
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
        item.outer.position.z = -0.18 - currentExplode * 1.4;
        item.core.position.z = 0.18 + currentExplode * 1.4;

        // Gentle floating oscillation
        item.group.position.y =
          item.baseY + Math.sin(t * 0.75 + item.bobOffset) * 0.15;

        // Continuous rotation
        if (isAutoRotating) {
          item.group.rotation.y += item.spin * 0.012;
        }
      });

      renderer.render(scene, camera);
    };

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
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerdown", handlePointerDown);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={cn("relative w-full h-full min-h-[520px] overflow-hidden bg-black select-none", className)}>
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className={cn(
          "absolute inset-0 w-full h-full",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
      />

      {/* Floating HUD Meta Overlay (Sharp Box) */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
        <div className="relative inline-flex items-center gap-2 border border-white/20 bg-black px-3 py-1.5">
          <span className="corner-tl !w-1 !h-1" />
          <span className="corner-tr !w-1 !h-1" />
          <span className="corner-bl !w-1 !h-1" />
          <span className="corner-br !w-1 !h-1" />
          <span className="h-1.5 w-1.5 rounded-none bg-white animate-pulse" />
          <span className="font-mono text-xs font-bold text-white tracking-wider uppercase">
            INTELECTA 3D MONOLITH TRIO
          </span>
        </div>
        <span className="font-mono text-[11px] text-zinc-500 hidden sm:inline-block">
          Concentric Layered Clearcoat · Real-time WebGL
        </span>
      </div>

      {/* Interactive Controls Overlay (Sharp Box Control Panel) */}
      {showControls && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-3 w-full max-w-xl px-4">
          <div className="relative flex items-center gap-2 border border-white/20 bg-black px-3 py-2 shadow-2xl">
            <span className="corner-tl !w-1 !h-1" />
            <span className="corner-tr !w-1 !h-1" />
            <span className="corner-bl !w-1 !h-1" />
            <span className="corner-br !w-1 !h-1" />

            {/* Auto Rotate Toggle */}
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={cn(
                "flex items-center gap-1.5 rounded-none px-3 py-1.5 text-xs font-mono transition-all border",
                autoRotate
                  ? "bg-white text-black font-bold border-white"
                  : "bg-black text-zinc-400 border-white/15 hover:text-white hover:border-white/30"
              )}
            >
              <GlyphRotate className={cn("h-3.5 w-3.5", autoRotate && "animate-spin")} />
              <span>{autoRotate ? "Rotasi Aktif" : "Rotasi Diam"}</span>
            </button>

            {/* Wireframe Mode */}
            <button
              onClick={() => setWireframe(!wireframe)}
              className={cn(
                "flex items-center gap-1.5 rounded-none px-3 py-1.5 text-xs font-mono transition-all border",
                wireframe
                  ? "bg-white text-black font-bold border-white"
                  : "bg-black text-zinc-400 border-white/15 hover:text-white hover:border-white/30"
              )}
            >
              <GlyphEye className="h-3.5 w-3.5" />
              <span>Wireframe</span>
            </button>

            {/* Explode Layers Toggle */}
            <button
              onClick={() => setExplodeOffset(explodeOffset > 0 ? 0 : 0.85)}
              className={cn(
                "flex items-center gap-1.5 rounded-none px-3 py-1.5 text-xs font-mono transition-all border",
                explodeOffset > 0
                  ? "bg-white text-black font-bold border-white"
                  : "bg-black text-zinc-400 border-white/15 hover:text-white hover:border-white/30"
              )}
            >
              <GlyphLayers className="h-3.5 w-3.5" />
              <span>{explodeOffset > 0 ? "Satukan Layer" : "Explode Layer"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

