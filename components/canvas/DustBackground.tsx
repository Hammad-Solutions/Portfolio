import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function DustBackground() {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const count = 180;

  // Generate particle coordinate arrays, random sizes and custom individual vectors
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < count; i++) {
      // Spread coordinates (X, Y, Z)
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z coordinates spread near and far

      // Soft natural drift velocity vectors
      velocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: Math.random() * 0.004 + 0.002, // organic rising vector
        z: (Math.random() - 0.5) * 0.003
      });
    }
    return [positions, velocities];
  }, []);

  // Custom canvas generated circular bokeh texture
  const bokehTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.7)");
      gradient.addColorStop(0.25, "rgba(255, 255, 255, 0.35)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    const geo = pointsRef.current?.geometry;
    if (!geo) return;

    const positionsAttr = geo.attributes.position;
    const time = state.clock.getElapsedTime();

    // Rising and waving particles algorithm
    for (let i = 0; i < count; i++) {
      let x = positionsAttr.getX(i);
      let y = positionsAttr.getY(i);
      let z = positionsAttr.getZ(i);

      x += velocities[i].x + Math.sin(time * 0.5 + i) * 0.001;
      y += velocities[i].y;
      z += velocities[i].z;

      // Reset wrap bounds
      if (y > 8) y = -8;
      if (x > 8) x = -8;
      if (x < -8) x = 8;
      if (z > 5) z = -5;
      if (z < -5) z = 5;

      positionsAttr.setXYZ(i, x, y, z);
    }
    positionsAttr.needsUpdate = true;

    // Mouse parallax coordinate tracking
    const targetX = mouse.x * 0.8;
    const targetY = mouse.y * 0.8;
    if (pointsRef.current) {
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.03);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.03);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.6}
        color="#F3F4F6"
        transparent
        opacity={0.25}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={bokehTexture || undefined}
      />
    </points>
  );
}
