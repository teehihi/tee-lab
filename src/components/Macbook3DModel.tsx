import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { DRACOLoader, GLTFLoader } from "three-stdlib";

// Enable caching
THREE.Cache.enabled = true;

// Shared loader instance at module level
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const textureLoader = new THREE.TextureLoader();

interface Macbook3DModelProps {
  screenImage: string;
  className?: string;
}

export function Macbook3DModel({ screenImage, className = "" }: Macbook3DModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    // PerspectiveCamera(32) with Z=11.2 provides massive margin clearance around model, eliminating all corner clipping
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 11.2);

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
    modelGroup.scale.set(0.92, 0.92, 0.92);
    scene.add(modelGroup);

    // 3. Lighting (Exact setup from HamishMW portfolio)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(0.5, 2, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x10b981, 0.9);
    fillLight.position.set(-6, 2, 2);
    scene.add(fillLight);

    // Load texture & GLTF model using shared modelLoader
    const screenTexture = textureLoader.load(screenImage);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.flipY = false;
    screenTexture.generateMipmaps = false;

    gltfLoader.load(
      "/models/macbook-pro.glb",
      (gltf) => {
        modelGroup.add(gltf.scene);

        gltf.scene.traverse((node: any) => {
          if (node.material) {
            node.material.color = new THREE.Color(0x1f2025);
          }

          if (node.name === "Frame") {
            node.rotation.x = THREE.MathUtils.degToRad(0);
          }

          if (node.name === "Screen") {
            node.material = new THREE.MeshBasicMaterial({
              map: screenTexture,
              transparent: true,
            });
          }
        });

        setLoaded(true);
      },
      undefined,
      (err) => console.error("Error loading macbook-pro.glb:", err)
    );

    // 5. Mouse Interaction Physics
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

      targetRotY = mouseX * 0.28;
      targetRotX = mouseY * 0.2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 6. Animation Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Lerp Smooth Rotation
      modelGroup.rotation.x += (targetRotX - modelGroup.rotation.x) * 0.05;
      modelGroup.rotation.y += (targetRotY - modelGroup.rotation.y) * 0.05;

      // Gentle floating levitation
      modelGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth || 700;
      const newH = container.clientHeight || 500;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [screenImage]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[420px] sm:h-[480px] lg:h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground animate-pulse">
          Loading 3D Macbook Pro Model...
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
