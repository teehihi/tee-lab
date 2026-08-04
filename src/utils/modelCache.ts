import * as THREE from "three";
import { DRACOLoader, GLTFLoader, GLTF } from "three-stdlib";

// Enable Three.js global texture/file cache
THREE.Cache.enabled = true;

// Shared DRACO and GLTF Loader Instances
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const textureLoader = new THREE.TextureLoader();

// In-Memory Global Caches
const gltfCache = new Map<string, GLTF>();
const textureCache = new Map<string, THREE.Texture>();
const activeLoadingPromises = new Map<string, Promise<any>>();

/**
 * Load GLTF Model with In-Memory Caching & Deduplication.
 * Returns a cloned scene instance so multiple components can render independent models instantly.
 */
export async function loadGLTFModel(url: string): Promise<GLTF> {
  // 1. Check in-memory GLTF cache
  if (gltfCache.has(url)) {
    const cached = gltfCache.get(url)!;
    return {
      ...cached,
      scene: cached.scene.clone(true),
    };
  }

  // 2. Check if already loading (deduplicate simultaneous requests)
  if (activeLoadingPromises.has(url)) {
    const cached = await activeLoadingPromises.get(url)!;
    return {
      ...cached,
      scene: cached.scene.clone(true),
    };
  }

  // 3. Initiate Load
  const loadPromise = new Promise<GLTF>((resolve, reject) => {
    gltfLoader.load(
      url,
      (gltf) => {
        gltfCache.set(url, gltf);
        activeLoadingPromises.delete(url);
        resolve(gltf);
      },
      undefined,
      (error) => {
        activeLoadingPromises.delete(url);
        reject(error);
      }
    );
  });

  activeLoadingPromises.set(url, loadPromise);
  const gltf = await loadPromise;
  return {
    ...gltf,
    scene: gltf.scene.clone(true),
  };
}

/**
 * Load & Cache Three.js Texture with Instant Memory Return
 */
export function loadCachedTexture(url: string): THREE.Texture {
  if (textureCache.has(url)) {
    return textureCache.get(url)!;
  }

  const texture = textureLoader.load(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(url, texture);
  return texture;
}

/**
 * Preload all critical 3D assets in the background during app startup.
 */
export function preload3DAssets() {
  const modelsToPreload = ["/models/macbook-pro.glb", "/models/iphone.glb"];
  const texturesToPreload = ["/bannerMac.png", "/phone-screen.png", "/bg1.webp", "/Bg2.webp", "/bg3.webp"];

  // Preload GLTF Models in parallel background tasks
  modelsToPreload.forEach((url) => {
    loadGLTFModel(url).catch((err) =>
      console.warn(`[3D Preloader] Preloading ${url} skipped/failed:`, err)
    );
  });

  // Preload Textures
  texturesToPreload.forEach((url) => {
    loadCachedTexture(url);
  });
}
