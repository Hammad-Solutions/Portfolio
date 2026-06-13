import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function ObsidianCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  // Memoize geometry to prevent recreate loops
  const shellGeom = useMemo(() => new THREE.IcosahedronGeometry(2.0, 3), []);
  const initialPositions = useMemo(() => shellGeom.attributes.position.clone(), [shellGeom]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Smooth group orbital drift and mouse parallax
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.06;
      groupRef.current.rotation.z = time * 0.03;
      
      const targetX = mouse.x * 2.2;
      const targetY = mouse.y * 2.2;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.04);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.04);
    }

    // Dynamic scale pulse on the core
    if (coreRef.current) {
      const scale = 1 + Math.sin(time * 1.5) * 0.04;
      coreRef.current.scale.set(scale, scale, scale);
    }

    // Vertices deformation using trig waves
    const posAttr = shellGeom.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const ix = initialPositions.getX(i);
      const iy = initialPositions.getY(i);
      const iz = initialPositions.getZ(i);

      // Organic displacement wave
      const wave = Math.sin(ix * 1.2 + time) * Math.cos(iy * 1.2 + time) * 0.12;
      posAttr.setXYZ(i, ix + ix * wave, iy + iy * wave, iz + iz * wave);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight position={[10, 10, 10]} intensity={2.0} color="#EDEDED" />
      <directionalLight position={[-10, -10, -10]} intensity={0.6} color="#262626" />

      {/* Glossy Obsidian Core Sphere */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.2, 4]} />
        <meshStandardMaterial
          color="#121212"
          roughness={0.12}
          metalness={0.95}
        />
      </mesh>

      {/* Morphing Wireframe Shell */}
      <mesh ref={shellRef} geometry={shellGeom}>
        <meshStandardMaterial
          color="#737373"
          roughness={0.4}
          metalness={0.7}
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
    </group>
  );
}
