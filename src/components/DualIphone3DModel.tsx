import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { loadGLTFModel, loadCachedTexture } from "../utils/modelCache";

interface DualIphone3DModelProps {
  screenImageFront?: string;
  screenImageBack?: string;
  className?: string;
}

export function DualIphone3DModel({
  screenImageFront = "/fbUTE.png",
  screenImageBack = "/screenMapUTE.png",
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
    renderer.setSize(width, height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 2. Root Group containing both Phones
    const dualGroup = new THREE.Group();
    dualGroup.position.set(-0.20, 0, 0);
    dualGroup.rotation.set(0, 0, 0);
    scene.add(dualGroup);

    // 3. Studio Lighting - Balanced Studio Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd4d4d8, 1.0);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
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

    // Helper to process phone material & apply textures cleanly
    const setupPhoneMaterials = (phoneScene: THREE.Group, screenTex: THREE.Texture) => {
      phoneScene.traverse((node: any) => {
        if (node.isMesh && node.material) {
          const processMat = (mat: any) => {
            const matName = (mat?.name || "").toLowerCase();

            if (matName === "oled") {
              const newMat = mat.clone();
              newMat.map = screenTex;
              newMat.color.setHex(0xffffff);
              if (newMat.emissive !== undefined) newMat.emissive.setHex(0x000000);
              if (newMat.emissiveIntensity !== undefined) newMat.emissiveIntensity = 0;
              newMat.roughness = 0.2;
              newMat.metalness = 0.0;
              newMat.needsUpdate = true;
              node.material = newMat;
            } else if (matName === "oled off" || matName === "display frame") {
              const darkMat = mat.clone();
              darkMat.map = null;
              darkMat.color.setHex(0x000000);
              if (darkMat.emissive !== undefined) darkMat.emissive.setHex(0x000000);
              if (darkMat.emissiveIntensity !== undefined) darkMat.emissiveIntensity = 0;
              darkMat.roughness = 0.9;
              darkMat.metalness = 0.0;
              darkMat.needsUpdate = true;
              node.material = darkMat;
            } else if (matName.includes("glass") || matName.includes("tint")) {
              mat.transparent = true;
              mat.opacity = 0.15;
              mat.roughness = 0.1;
              if (mat.emissive !== undefined) mat.emissive.setHex(0x000000);
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
    loadGLTFModel("/models/iphone-17-pro.glb")
      .then((gltf) => {
        if (!isMounted) return;

        const baseScene = gltf.scene;
        baseScene.rotation.y = Math.PI;

        const box = new THREE.Box3().setFromObject(baseScene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        baseScene.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetHeight = 2.05;
        const scaleFactor = targetHeight / (maxDim || 1);

        // Phone 1: Back Left Phone
        const backPhone = baseScene.clone(true);
        backPhone.scale.set(scaleFactor * 0.98, scaleFactor * 0.98, scaleFactor * 0.98);
        setupPhoneMaterials(backPhone, textureBack);

        const backContainer = new THREE.Group();
        backContainer.position.set(-0.35, 0.44, -0.40);
        backContainer.rotation.set(0, 0, 0);
        backContainer.add(backPhone);
        dualGroup.add(backContainer);

        // Phone 2: Front Right Phone
        const frontPhone = baseScene.clone(true);
        frontPhone.scale.set(scaleFactor * 1.02, scaleFactor * 1.02, scaleFactor * 1.02);
        setupPhoneMaterials(frontPhone, textureFront);

        const frontContainer = new THREE.Group();
        frontContainer.position.set(0.28, -0.22, 0.40);
        frontContainer.rotation.set(0, 0, 0);
        frontContainer.add(frontPhone);
        dualGroup.add(frontContainer);

        setLoaded(true);
        handleResize();
      })
      .catch((err) => console.error("Error loading dual iphone glb:", err));

    // 6. Mouse Parallax Setup
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouseX = (event.clientX - rect.left) / rect.width - 0.5;
      mouseY = (event.clientY - rect.top) / rect.height - 0.5;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    let animationFrameId: number;

    const handleResize = () => {
      if (!container || !canvas || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }
    };

    const animate = () => {
      if (!isMounted) return;
      animationFrameId = requestAnimationFrame(animate);

      // Auto-recheck viewport dimensions whenever container becomes visible (> 0)
      if (container.clientWidth > 0 && container.clientHeight > 0) {
        const expectedW = container.clientWidth;
        const expectedH = container.clientHeight;
        const currentW = parseInt(canvas.style.width || "0", 10);
        const currentH = parseInt(canvas.style.height || "0", 10);

        if (currentW !== expectedW || currentH !== expectedH) {
          handleResize();
        }
      }

      // Micro mouse tilt
      targetRotY += (mouseX * 0.03 - targetRotY) * 0.04;
      targetRotX += (-mouseY * 0.02 - targetRotX) * 0.04;

      dualGroup.rotation.y = targetRotY;
      dualGroup.rotation.x = targetRotX;
      dualGroup.position.y = 0;
      dualGroup.rotation.z = 0;

      renderer.render(scene, camera);
    };

    animate();

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
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
