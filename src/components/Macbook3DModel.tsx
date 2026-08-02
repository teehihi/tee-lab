import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface Macbook3DModelProps {
  screenImage: string;
  className?: string;
}

export function Macbook3DModel({ screenImage, className = "" }: Macbook3DModelProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 380;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear old canvases
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x10b981, 3.5, 10);
    pointLight.position.set(-3, 2, 2);
    scene.add(pointLight);

    // 3. Materials
    const aluminumMaterial = new THREE.MeshStandardMaterial({
      color: 0x1d1e23,
      metalness: 0.85,
      roughness: 0.25,
    });

    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f1012,
      metalness: 0.9,
      roughness: 0.3,
    });

    const keyboardMaterial = new THREE.MeshStandardMaterial({
      color: 0x121316,
      roughness: 0.7,
    });

    // Screen Texture
    const textureLoader = new THREE.TextureLoader();
    const screenTexture = textureLoader.load(screenImage);
    screenTexture.colorSpace = THREE.SRGBColorSpace;

    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });

    // 4. Laptop Root Group
    const laptopGroup = new THREE.Group();
    scene.add(laptopGroup);

    // --- SCREEN LID ---
    const lidGroup = new THREE.Group();
    laptopGroup.add(lidGroup);
    lidGroup.position.set(0, 0.1, -1.2);

    // Lid Shell
    const lidGeo = new THREE.BoxGeometry(4.3, 2.75, 0.08);
    const lidMesh = new THREE.Mesh(lidGeo, aluminumMaterial);
    lidMesh.position.set(0, 1.35, 0);
    lidGroup.add(lidMesh);

    // Screen Bezel
    const bezelGeo = new THREE.BoxGeometry(4.18, 2.65, 0.01);
    const bezelMesh = new THREE.Mesh(bezelGeo, darkMaterial);
    bezelMesh.position.set(0, 1.35, 0.042);
    lidGroup.add(bezelMesh);

    // Screen Display Plane
    const displayGeo = new THREE.PlaneGeometry(4.05, 2.5);
    const displayMesh = new THREE.Mesh(displayGeo, screenMaterial);
    displayMesh.position.set(0, 1.35, 0.048);
    lidGroup.add(displayMesh);

    // Tilt Lid back slightly
    lidGroup.rotation.x = THREE.MathUtils.degToRad(-15);

    // --- KEYBOARD BASE DECK ---
    const baseGroup = new THREE.Group();
    laptopGroup.add(baseGroup);
    baseGroup.position.set(0, -0.05, 0.1);

    // Base Chassis Body
    const baseGeo = new THREE.BoxGeometry(4.4, 0.12, 2.7);
    const baseMesh = new THREE.Mesh(baseGeo, aluminumMaterial);
    baseMesh.position.set(0, 0, 0);
    baseMesh.receiveShadow = true;
    baseGroup.add(baseMesh);

    // Keyboard Recess Plane
    const kbRecessGeo = new THREE.BoxGeometry(3.9, 0.02, 1.4);
    const kbRecessMesh = new THREE.Mesh(kbRecessGeo, keyboardMaterial);
    kbRecessMesh.position.set(0, 0.065, -0.4);
    baseGroup.add(kbRecessMesh);

    // Trackpad Plane
    const trackpadGeo = new THREE.BoxGeometry(1.4, 0.01, 0.85);
    const trackpadMesh = new THREE.Mesh(trackpadGeo, darkMaterial);
    trackpadMesh.position.set(0, 0.065, 0.7);
    baseGroup.add(trackpadMesh);

    // Initial Laptop Group Tilt
    laptopGroup.rotation.x = THREE.MathUtils.degToRad(12);
    laptopGroup.rotation.y = THREE.MathUtils.degToRad(-18);

    // 5. Mouse Interaction Physics
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = THREE.MathUtils.degToRad(12);
    let targetRotY = THREE.MathUtils.degToRad(-18);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      mouseX = x * 2;
      mouseY = y * 2;

      targetRotY = mouseX * 0.45;
      targetRotX = -mouseY * 0.35 + THREE.MathUtils.degToRad(10);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp Physics
      laptopGroup.rotation.x += (targetRotX - laptopGroup.rotation.x) * 0.05;
      laptopGroup.rotation.y += (targetRotY - laptopGroup.rotation.y) * 0.05;

      // Floating Levitation
      laptopGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 540;
      const newH = container.clientHeight || 380;
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
      ref={mountRef}
      className={`relative w-full h-[380px] sm:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
    />
  );
}
