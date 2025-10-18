import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useEffect } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { Starfield } from './Starfield';
import * as THREE from 'three';

interface Scene3DProps {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
}

function CameraController({ scrollProgress, mousePosition }: Scene3DProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    if (cameraRef.current) {
      // Camera moves based on scroll
      cameraRef.current.position.y = 2 - scrollProgress * 3;
      cameraRef.current.position.z = 8 - scrollProgress * 5;

      // Subtle mouse tracking
      cameraRef.current.position.x = mousePosition.x * 0.5;
      cameraRef.current.rotation.y = mousePosition.x * 0.1;
      cameraRef.current.rotation.x = -mousePosition.y * 0.05;
    }
  }, [scrollProgress, mousePosition]);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 2, 8]}
      fov={75}
    />
  );
}

export function Scene3D({ scrollProgress, mousePosition }: Scene3DProps) {
  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: -1, pointerEvents: 'none' }}>
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          <CameraController scrollProgress={scrollProgress} mousePosition={mousePosition} />

          {/* Background color */}
          <color attach="background" args={['#0a0a0f']} />
          <fog attach="fog" args={['#0a0a0f', 10, 50]} />

          {/* Simple ambient lighting for stars */}
          <ambientLight intensity={0.3} />

          {/* 3D Elements - Just the starfield */}
          <Starfield />

          {/* Optional controls for debugging - can be removed */}
          {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
