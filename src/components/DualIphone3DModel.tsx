import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { MacbookLoader } from "./MacbookLoader";
import { loadGLTFModel, loadCachedTexture } from "../utils/modelCache";

interface DualIphone3DModelProps {
  screenImageFront?: string;
  screenImageBack?: string;
  className?: string;
}

export function DualIphone3DModel({
  screenImageFront = "/phone-screen.png",
  screenImageBack = "/phone-screen.png",
  className = "",
}: DualIphone3DModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isMounted = true;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 2. Root Group containing both Phones
    const dualGroup = new THREE.Group();
    // Default angle for the dual-phone composition
    dualGroup.position.set(0, 0, 0);
    dualGroup.rotation.set(0.05, 0.15, 0);
    scene.add(dualGroup);

    // 3. Studio Lighting - Pure Neutral Studio Setup for natural Space Gray / Dark Titanium body finish
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe4e4e7, 1.6);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
    rimLight.position.set(0, -3, -2);
    scene.add(rimLight);

    // 4. Load Textures
    const textureFront = loadCachedTexture(screenImageFront);
    textureFront.center.set(0.5, 0.5);
    textureFront.rotation = Math.PI;
    textureFront.generateMipmaps = false;

    const textureBack = loadCachedTexture(screenImageBack);
    textureBack.center.set(0.5, 0.5);
    textureBack.rotation = Math.PI;
    textureBack.generateMipmaps = false;

    // Helper to process phone material & apply textures
    const setupPhoneMaterials = (phoneScene: THREE.Group, screenTex: THREE.Texture) => {
      phoneScene.traverse((node: any) => {
        if (node.isMesh && node.material) {
          const processMat = (mat: any) => {
            const matName = (mat?.name || "").toLowerCase();
            if (matName === "oled" || matName === "oled off") {
              const newMat = mat.clone();
              newMat.map = screenTex;
              if (newMat.emissiveMap !== undefined) newMat.emissiveMap = screenTex;
              if (newMat.emissive !== undefined) newMat.emissive.setHex(0xffffff);
              if (newMat.emissiveIntensity !== undefined) newMat.emissiveIntensity = 0.85;
              newMat.needsUpdate = true;
              node.material = newMat;
            } else if (matName.includes("glass")) {
              mat.transparent = true;
              mat.opacity = 0.35;
              mat.needsUpdate = true;
            }
          };
          if (Array.isArray(node.material)) {
            node.material.forEach(processMat);
          } else {
            processMat(node.material);
          }
        }
      });
    };

    // 5. Load GLTF Model & Clone into 2 Phones
    loadGLTFModel("/models/iphone.glb")
      .then((gltf) => {
        if (!isMounted) return;

        // Base Phone model setup
        const baseScene = gltf.scene;
        baseScene.rotation.y = Math.PI;

        const box = new THREE.Box3().setFromObject(baseScene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        baseScene.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetHeight = 2.15;
        const scaleFactor = targetHeight / (maxDim || 1);

        // --- PHONE 1: Back Left Phone (Positioned higher, upright facing forward) ---
        const backPhone = baseScene.clone(true);
        backPhone.scale.set(scaleFactor * 0.98, scaleFactor * 0.98, scaleFactor * 0.98);
        setupPhoneMaterials(backPhone, textureBack);
        
        const backContainer = new THREE.Group();
        backContainer.position.set(-0.35, 0.42, -0.40);
        backContainer.rotation.set(0.04, 0.08, -0.02);
        backContainer.add(backPhone);
        dualGroup.add(backContainer);

        // --- PHONE 2: Front Right Phone (Positioned lower, overlapping bottom right) ---
        const frontPhone = baseScene.clone(true);
        frontPhone.scale.set(scaleFactor * 1.05, scaleFactor * 1.05, scaleFactor * 1.05);
        setupPhoneMaterials(frontPhone, textureFront);

        const frontContainer = new THREE.Group();
        frontContainer.position.set(0.28, -0.36, 0.40);
        frontContainer.rotation.set(-0.02, -0.06, 0.02);
        frontContainer.add(frontPhone);
        dualGroup.add(frontContainer);

        setLoaded(true);
      })
      .catch((err) => console.error("Error loading dual iphone glb:", err));

    // 6. Mouse Parallax & Floating Physics Loop
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = (event.clientX - rect.left) / rect.width - 0.5;
      mouseY = (event.clientY - rect.top) / rect.height - 0.5;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isMounted) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth Mouse Lerp Parallax
      targetRotY += (mouseX * 0.4 - targetRotY) * 0.05;
      targetRotX += (-mouseY * 0.3 - targetRotX) * 0.05;

      // Gentle Sine Wave Float
      const floatY = Math.sin(elapsedTime * 1.4) * 0.06;
      const floatRotZ = Math.cos(elapsedTime * 1.2) * 0.02;

      dualGroup.rotation.y = 0.15 + targetRotY;
      dualGroup.rotation.x = 0.05 + targetRotX;
      dualGroup.position.y = floatY;
      dualGroup.rotation.z = floatRotZ;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      isMounted = false;
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [screenImageFront, screenImageBack]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] select-none ${className}`}
    >
      {!loaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-3xl">
          <MacbookLoader />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
