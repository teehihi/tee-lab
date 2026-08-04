import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { loadGLTFModel, loadCachedTexture } from "../utils/modelCache";

interface Macbook3DModelProps {
  screenImage: string;
  className?: string;
  onLidOpenStateChange?: (isOpen: boolean) => void;
}

export function Macbook3DModel({ screenImage, className = "", onLidOpenStateChange }: Macbook3DModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 540;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    // Camera X=0 (centered), Y=0.20 (vertically centered with cards), Z=9.4 (safety margin buffer around all 4 edges)
    camera.position.set(0, 0.20, 9.4);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 2. Model Root Group
    const modelGroup = new THREE.Group();
    // 1.15x scale fits elegantly with zero edge clipping
    modelGroup.scale.set(1.15, 1.15, 1.15);
    scene.add(modelGroup);

    // 3. Lighting (Exact setup from HamishMW portfolio)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(0.5, 2, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x10b981, 0.95);
    fillLight.position.set(-6, 2, 2);
    scene.add(fillLight);

    // 4. Load texture & GLTF model via Model Cache Manager
    const screenTexture = loadCachedTexture(screenImage);
    screenTexture.flipY = false;
    screenTexture.generateMipmaps = false;

    let frameNode: THREE.Object3D | null = null;
    let isViewportVisible = false;

    // IntersectionObserver to trigger lid opening animation when scrolling into middle of viewport (~50%)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isViewportVisible = entry.isIntersecting;
        if (onLidOpenStateChange) {
          onLidOpenStateChange(entry.isIntersecting);
        }
      },
      {
        threshold: 0.5, // Requires model to be ~50% in middle of viewport
        rootMargin: "-20% 0px -20% 0px", // Triggers exclusively in the middle 60% band of screen
      }
    );
    observer.observe(container);

    loadGLTFModel("/models/macbook-pro.glb")
      .then((gltf) => {
        modelGroup.add(gltf.scene);

        gltf.scene.traverse((node: any) => {
          if (node.material) {
            node.material.color = new THREE.Color(0x1f2025);
          }

          if (node.name === "Frame") {
            frameNode = node;
            // Start lid open at 0 degrees
            frameNode.rotation.x = 0;
          }

          if (node.name === "Screen") {
            node.material = new THREE.MeshBasicMaterial({
              map: screenTexture,
              transparent: true,
            });
          }
        });

        setLoaded(true);
      })
      .catch((err) => console.error("Error loading macbook-pro.glb:", err));

    // 5. Controlled Mouse Interaction Physics (Sleek Apple-style tilt, zero edge clipping)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      mouseX = x;
      mouseY = y;

      targetRotY = mouseX * 0.18;
      targetRotX = mouseY * 0.12;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 6. Animation Render Loop with Scroll-Triggered Lid Opening
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let currentLidAngle = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Lerp Smooth Model Rotation
      modelGroup.rotation.x += (targetRotX - modelGroup.rotation.x) * 0.05;
      modelGroup.rotation.y += (targetRotY - modelGroup.rotation.y) * 0.05;

      // Gentle floating levitation
      modelGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.04;

      // Scroll-triggered Macbook Lid Unfolding Animation
      if (frameNode) {
        const targetLidAngle = isViewportVisible ? 0 : THREE.MathUtils.degToRad(75);
        currentLidAngle += (targetLidAngle - currentLidAngle) * 0.045;
        (frameNode as THREE.Object3D).rotation.x = currentLidAngle;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth || 800;
      const newH = container.clientHeight || 540;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [screenImage]);

  return (
    <div
      ref={containerRef}
      className={`relative z-20 w-full h-[440px] sm:h-[500px] lg:h-[540px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-visible ${className}`}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground animate-pulse">
          Loading 3D Macbook Pro Model...
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full block overflow-visible" />
    </div>
  );
}
