import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function InteractiveBackground() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const count = 150;

  // Generate particle positions
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return arr;
  }, []);

  // Soft circle texture for particles
  const particleTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate and scale the clay shape
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.12;
      meshRef.current.rotation.y = time * 0.08;

      // Soft breathing morph
      const scale = 1 + Math.sin(time * 1.5) * 0.04;
      meshRef.current.scale.set(scale, scale, scale);
    }

    // Parallax mouse movements
    if (groupRef.current) {
      const targetX = mouse.x * 2.0;
      const targetY = mouse.y * 2.0;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    }

    // Particle drifts
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Warm natural ambient fill */}
      <ambientLight intensity={0.9} color="#FAF8F5" />

      {/* Warm sunlight directional light */}
      <directionalLight position={[8, 12, 8]} intensity={1.8} color="#FFF7EE" />

      {/* Terracotta bounce fill light from below */}
      <directionalLight position={[-8, -12, -8]} intensity={0.4} color="#D95D39" />

      {/* Matte Terracotta Ceramic Torus Knot */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.5, 0.5, 180, 16]} />
        <meshStandardMaterial
          color="#D95D39" // Terracotta Red/Orange
          roughness={0.9} // Heavy matte clay/ceramic feel
          metalness={0.02}
        />
      </mesh>

      {/* Floating sand dust particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#8C7853" // Muted sand bronze
          transparent
          opacity={0.25}
          sizeAttenuation
          depthWrite={false}
          map={particleTexture || undefined}
        />
      </points>
    </group>
  );
}
