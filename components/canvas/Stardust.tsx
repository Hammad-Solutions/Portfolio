import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Stardust() {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const count = 150;

  // Generate a custom circular soft-glow texture dynamically
  const texture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  // Generate particles positions and random colors (faint blues and teals)
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Position spread
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      // Colors: blue-green spectrum with faint saturation
      const isTeal = Math.random() > 0.5;
      if (isTeal) {
        colors[i * 3] = 0.0;     // R (low red)
        colors[i * 3 + 1] = 0.86; // G (teal)
        colors[i * 3 + 2] = 0.51; // B
      } else {
        colors[i * 3] = 0.18;    // R
        colors[i * 3 + 1] = 0.5;  // G
        colors[i * 3 + 2] = 0.93; // B (blue)
      }
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Slow orbital rotation
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.008;

    // Parallax mouse movements (slow camera offsets)
    const targetX = mouse.x * 0.4;
    const targetY = mouse.y * 0.4;
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.03);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.03);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={texture || undefined}
      />
    </points>
  );
}
