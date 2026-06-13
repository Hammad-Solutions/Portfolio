import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Constellation() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const count = 60;
  const maxDistance = 3.0;

  // Generate initial random particles and velocities
  const [positions, pointsData] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const pointsData: { pos: THREE.Vector3; velocity: THREE.Vector3 }[] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 12;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      pointsData.push({
        pos: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005
        )
      });
    }
    return [positions, pointsData];
  }, []);

  useFrame((state) => {
    // Subtle rotation and mouse parallax
    if (groupRef.current) {
      const targetX = mouse.x * 0.3;
      const targetY = mouse.y * 0.3;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX + state.clock.getElapsedTime() * 0.005, 0.05);
    }

    const pointsGeo = pointsRef.current?.geometry;
    const linesGeo = linesRef.current?.geometry;
    if (!pointsGeo || !linesGeo) return;

    const positionsAttr = pointsGeo.attributes.position;
    const linePositions: number[] = [];

    // Update positions based on velocity
    for (let i = 0; i < count; i++) {
      const pData = pointsData[i];
      pData.pos.add(pData.velocity);

      // Boundary collision check (bounce back)
      if (Math.abs(pData.pos.x) > 6) pData.velocity.x *= -1;
      if (Math.abs(pData.pos.y) > 6) pData.velocity.y *= -1;
      if (Math.abs(pData.pos.z) > 6) pData.velocity.z *= -1;

      positionsAttr.setXYZ(i, pData.pos.x, pData.pos.y, pData.pos.z);
    }
    positionsAttr.needsUpdate = true;

    // Build dynamic lines between close points
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = pointsData[i].pos.distanceTo(pointsData[j].pos);
        if (dist < maxDistance) {
          linePositions.push(
            pointsData[i].pos.x, pointsData[i].pos.y, pointsData[i].pos.z,
            pointsData[j].pos.x, pointsData[j].pos.y, pointsData[j].pos.z
          );
        }
      }
    }

    // Set new line attributes dynamically
    linesGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    linesGeo.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#2F80ED"
          size={0.06}
          sizeAttenuation={true}
          transparent
          opacity={0.4}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#2F80ED"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
