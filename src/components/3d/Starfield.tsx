import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Starfield() {
  const starsRef = useRef<THREE.Points>(null);

  const stars = useMemo(() => {
    const starCount = 3000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;

      // Spherical distribution
      const radius = 50 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Star colors (white to slight blue/yellow tint)
      const colorChoice = Math.random();
      if (colorChoice > 0.9) {
        // Warm stars
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.9;
        colors[i3 + 2] = 0.7;
      } else if (colorChoice > 0.8) {
        // Cool stars
        colors[i3] = 0.7;
        colors[i3 + 1] = 0.8;
        colors[i3 + 2] = 1.0;
      } else {
        // White stars
        colors[i3] = 1.0;
        colors[i3 + 1] = 1.0;
        colors[i3 + 2] = 1.0;
      }

      sizes[i] = Math.random() * 1.5 + 0.5;
    }

    return { positions, colors, sizes, count: starCount };
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
      starsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.005) * 0.1;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={stars.count}
          array={stars.positions}
          itemSize={3}
          args={[stars.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={stars.count}
          array={stars.colors}
          itemSize={3}
          args={[stars.colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={stars.count}
          array={stars.sizes}
          itemSize={1}
          args={[stars.sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.8}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
}
