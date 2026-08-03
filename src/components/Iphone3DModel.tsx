import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { DRACOLoader, GLTFLoader } from "three-stdlib";
import { MacbookLoader } from "./MacbookLoader";

THREE.Cache.enabled = true;

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const textureLoader = new THREE.TextureLoader();

interface Iphone3DModelProps {
  screenImage?: string;
  isZoomedIn?: boolean;
  onZoomComplete?: () => void;
  onModelLoaded?: () => void;
  className?: string;
}

export function Iphone3DModel({
  screenImage = "/phone-screen.png",
  isZoomedIn = false,
  onZoomComplete,
  onModelLoaded,
  className = "",
}: Iphone3DModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Refs for state
  const isZoomedRef = useRef(isZoomedIn);
  isZoomedRef.current = isZoomedIn;

  const onZoomCompleteRef = useRef(onZoomComplete);
  onZoomCompleteRef.current = onZoomComplete;

  const onModelLoadedRef = useRef(onModelLoaded);
  onModelLoadedRef.current = onModelLoaded;

  const entranceProgressRef = useRef(0);
  const isModelLoadedInSceneRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isMounted = true;
    entranceProgressRef.current = 0;
    isModelLoadedInSceneRef.current = false;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 700;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.4);

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
    // Start below Y = -4.5 for smooth entrance rise up
    modelGroup.position.set(0, -4.5, 0);
    // Initial entrance tilt matching reference image angle (~-17 deg Y tilt)
    modelGroup.rotation.set(0.16, -0.30, 0.02);
    scene.add(modelGroup);

    // 3. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    fillLight.position.set(-5, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xa855f7, 2.0);
    rimLight.position.set(0, -3, -2);
    scene.add(rimLight);

    // 4. Load Texture & GLTF Model
    const screenTexture = textureLoader.load(screenImage);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.center.set(0.5, 0.5);
    screenTexture.rotation = Math.PI;
    screenTexture.generateMipmaps = false;

    gltfLoader.load(
      "/models/iphone.glb",
      (gltf) => {
        if (!isMounted) return;
        // Rotate 180 deg around Y so FRONT DISPLAY screen faces camera
        gltf.scene.rotation.y = Math.PI;

        // Calculate Bounding Box & Scale to 2.15 units tall
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        gltf.scene.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetHeight = 2.15;
        const scaleFactor = targetHeight / (maxDim || 1);
        gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // Traverse & update existing material properties directly
        gltf.scene.traverse((node: any) => {
          if (node.isMesh && node.material) {
            const processMat = (mat: any) => {
              const matName = (mat?.name || "").toLowerCase();
              if (matName === "oled" || matName === "oled off") {
                mat.map = screenTexture;
                if (mat.emissiveMap !== undefined) mat.emissiveMap = screenTexture;
                if (mat.emissive !== undefined) mat.emissive.setHex(0xffffff);
                if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = 0.8;
                mat.needsUpdate = true;
              } else if (matName.includes("glass")) {
                mat.transparent = true;
                mat.opacity = 0.0;
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

        modelGroup.add(gltf.scene);
        isModelLoadedInSceneRef.current = true;
        entranceProgressRef.current = 0; // RESET ENTRANCE PROGRESS WHEN GLTF IS ADDED TO SCENE
        setLoaded(true);
        if (onModelLoadedRef.current) {
          onModelLoadedRef.current();
        }
      },
      undefined,
      (err) => console.error("Error loading iphone.glb:", err)
    );

    // 5. Interactive Mouse Hover & 360-Degree Continuous Drag Rotation Physics
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let dragRotX = 0;
    let dragRotY = 0;
    let hoverMouseX = 0;
    let hoverMouseY = 0;

    const handlePointerDown = (event: PointerEvent) => {
      if (isZoomedRef.current) return;
      isDragging = true;
      previousMouseX = event.clientX;
      previousMouseY = event.clientY;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (isZoomedRef.current) return;
      const rect = container.getBoundingClientRect();
      hoverMouseX = (event.clientX - rect.left) / rect.width - 0.5;
      hoverMouseY = (event.clientY - rect.top) / rect.height - 0.5;

      if (isDragging) {
        const deltaX = event.clientX - previousMouseX;
        const deltaY = event.clientY - previousMouseY;

        dragRotY += deltaX * 0.01;
        dragRotX += deltaY * 0.008;

        dragRotX = THREE.MathUtils.clamp(dragRotX, -1.0, 1.0);

        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // 6. Render Loop (STILL STANDING POSITION, CONTINUOUS 360 ROTATION)
    let animationFrameId: number;
    let zoomTriggered = false;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isModelLoadedInSceneRef.current && entranceProgressRef.current < 1) {
        entranceProgressRef.current += 0.014; // Smooth entrance spin & rise up
      }

      if (!isZoomedRef.current) {
        // Normal State: Phone rises from below up to higher target Y = 0.0
        const currentProgress = Math.min(entranceProgressRef.current, 1);
        const easeVal = Math.sin(currentProgress * Math.PI * 0.5);

        const targetY = 0.0 - (1 - easeVal) * 3.0;
        modelGroup.position.y += (targetY - modelGroup.position.y) * 0.08;

        // Entrance Rotation Spin: smoothly unwinds full 360 deg (2 * Math.PI) rotation into base tilt (-0.30 rad)
        const spinOffset = (1 - easeVal) * Math.PI * 2.0;
        const targetRotY = -0.30 + spinOffset + hoverMouseX * 0.15 + dragRotY;
        const targetRotX = 0.16 + hoverMouseY * 0.12 + dragRotX;
        const targetRotZ = 0.02;

        modelGroup.rotation.x += (targetRotX - modelGroup.rotation.x) * 0.08;
        modelGroup.rotation.y += (targetRotY - modelGroup.rotation.y) * 0.08;
        modelGroup.rotation.z += (targetRotZ - modelGroup.rotation.z) * 0.08;

        camera.position.z += (4.4 - camera.position.z) * 0.06;
      } else {
        // Zoomed State: Phone straightens upright (0,0,0) and zooms up towards camera
        modelGroup.position.y += (0.0 - modelGroup.position.y) * 0.08;
        modelGroup.position.x += (0 - modelGroup.position.x) * 0.08;

        modelGroup.rotation.x += (0 - modelGroup.rotation.x) * 0.08;
        modelGroup.rotation.y += (0 - modelGroup.rotation.y) * 0.08;
        modelGroup.rotation.z += (0 - modelGroup.rotation.z) * 0.08;

        camera.position.z += (2.2 - camera.position.z) * 0.08;

        if (!zoomTriggered && Math.abs(camera.position.z - 2.2) < 0.2) {
          zoomTriggered = true;
          if (onZoomCompleteRef.current) {
            onZoomCompleteRef.current();
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth || 800;
      const newH = container.clientHeight || 700;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [screenImage]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[520px] sm:h-[600px] lg:h-[680px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-visible ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full block overflow-visible" />
    </div>
  );
}
