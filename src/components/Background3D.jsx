import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line, ScrollControls, Stars, useScroll } from '@react-three/drei';
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

const sceneBg = new THREE.Color('#050710');
const seeded = (index, salt = 0) => {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453123;
  return x - Math.floor(x);
};

function CameraRig() {
  const scroll = useScroll();
  const { camera, pointer } = useThree();

  useFrame(() => {
    const o = scroll.offset;
    // React Three Fiber camera objects are intentionally mutable inside useFrame.
    // eslint-disable-next-line react-hooks/immutability
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.8 - o * 3.2 - camera.position.y) * 0.045;
    camera.position.z += (13 - o * 24 - camera.position.z) * 0.055;
    camera.rotation.z += (pointer.x * 0.04 - camera.rotation.z) * 0.04;
  });

  return null;
}

function NeonPortal() {
  const group = useRef();
  const rings = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    z: -i * 3.2,
    radius: 2.3 + i * 0.23,
    color: i % 3 === 0 ? '#35f5c6' : i % 3 === 1 ? '#ff4fd8' : '#5ddcff',
  })), []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.z = clock.elapsedTime * 0.08;
    group.current.children.forEach((ring, i) => {
      ring.rotation.x = Math.sin(clock.elapsedTime * 0.35 + i) * 0.14;
      ring.rotation.y = Math.cos(clock.elapsedTime * 0.28 + i) * 0.12;
    });
  });

  return (
    <group ref={group} position={[4.3, 0.2, -5]} rotation={[0.12, -0.35, 0.1]}>
      {rings.map((ring, index) => (
        <mesh key={ring.z} position={[0, 0, ring.z]}>
          <torusGeometry args={[ring.radius, 0.018, 12, 180]} />
          <meshBasicMaterial color={ring.color} transparent opacity={0.44 - index * 0.018} />
        </mesh>
      ))}
    </group>
  );
}

function CodeShards() {
  const ref = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geo = useMemo(() => new THREE.TetrahedronGeometry(1, 0), []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#61fff0',
    emissive: '#2ce7ff',
    emissiveIntensity: 1.9,
    roughness: 0.28,
    metalness: 0.38,
    transparent: true,
    opacity: 0.82,
  }), []);
  const shards = useMemo(() => Array.from({ length: 720 }, (_, index) => ({
    x: (seeded(index, 1) - 0.5) * 34,
    y: (seeded(index, 2) - 0.5) * 24,
    z: -seeded(index, 3) * 52,
    scale: 0.025 + seeded(index, 4) * 0.11,
    spin: (seeded(index, 5) - 0.5) * 1.9,
    drift: seeded(index, 6) * Math.PI * 2,
  })), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    shards.forEach((shard, index) => {
      dummy.position.set(
        shard.x + Math.sin(t * 0.45 + shard.drift) * 0.35,
        shard.y + Math.cos(t * 0.32 + shard.drift) * 0.22,
        shard.z + Math.sin(t * 0.18 + index) * 0.7,
      );
      dummy.rotation.set(t * shard.spin, t * shard.spin * 0.72, t * shard.spin * 0.44);
      dummy.scale.setScalar(shard.scale);
      dummy.updateMatrix();
      ref.current.setMatrixAt(index, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={ref} args={[geo, mat, shards.length]} frustumCulled={false} />;
}

function SignalRibbon() {
  const ribbon = useMemo(() => {
    return Array.from({ length: 5 }, (_, row) => {
      const pts = [];
      for (let i = 0; i < 72; i += 1) {
        const x = (i - 36) * 0.48;
        const y = Math.sin(i * 0.34 + row) * 0.8 + row * 0.58 - 1.6;
        const z = -13 - row * 3 - Math.cos(i * 0.22) * 2;
        pts.push(new THREE.Vector3(x, y, z));
      }
      return pts;
    });
  }, []);

  return (
    <group position={[0, -2.8, 0]} rotation={[-0.15, 0.04, 0]}>
      {ribbon.map((points, index) => (
        <Line
          key={index}
          points={points}
          color={index % 2 ? '#ff4fd8' : '#35f5c6'}
          lineWidth={1.2}
          transparent
          opacity={0.34}
        />
      ))}
    </group>
  );
}

function FloatingScreens() {
  const group = useRef();
  const screens = useMemo(() => [
    { x: -6.8, y: 1.9, z: -12, w: 3.5, h: 2.15, color: '#5ddcff' },
    { x: -4.6, y: -2.4, z: -22, w: 4.5, h: 2.6, color: '#35f5c6' },
    { x: 6.8, y: -2.1, z: -27, w: 4.0, h: 2.35, color: '#ff4fd8' },
  ], []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    group.current?.children.forEach((screen, i) => {
      screen.rotation.y = Math.sin(t * 0.35 + i) * 0.24;
      screen.position.y = screens[i].y + Math.sin(t * 0.55 + i) * 0.18;
    });
  });

  return (
    <group ref={group}>
      {screens.map((screen) => (
        <mesh key={screen.z} position={[screen.x, screen.y, screen.z]} rotation={[0.08, -0.2, 0.03]}>
          <planeGeometry args={[screen.w, screen.h, 8, 5]} />
          <meshBasicMaterial color={screen.color} wireframe transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={[sceneBg]} />
      <ambientLight intensity={0.65} />
      <pointLight position={[5, 5, 6]} color="#5ddcff" intensity={72} />
      <pointLight position={[-6, -3, -12]} color="#ff4fd8" intensity={60} />
      <pointLight position={[0, 3, -26]} color="#35f5c6" intensity={56} />
      <Stars radius={75} depth={50} count={1800} factor={3.5} fade speed={0.35} />
      <NeonPortal />
      <SignalRibbon />
      <CodeShards />
      <FloatingScreens />
      <CameraRig />
      <EffectComposer>
        <Bloom intensity={1.75} luminanceThreshold={0.18} luminanceSmoothing={0.55} mipmapBlur radius={0.72} />
        <Vignette offset={0.16} darkness={0.78} />
        <Noise opacity={0.035} />
      </EffectComposer>
    </>
  );
}

export default function Background3D({ children }) {
  return (
    <div className="scene-root">
      <Canvas
        camera={{ position: [0, 0, 13], fov: 54 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={4} damping={0.12}>
            <Scene />
            {children}
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
