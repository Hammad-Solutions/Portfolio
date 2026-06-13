import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface NodeData {
  id: string;
  name: string;
  pos: THREE.Vector3;
  velocity: THREE.Vector3;
  seed: number;
}

export default function DeveloperGraph() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const skills = [
    "REACT", "NEXT.JS", "NODE.JS", "C++", "JAVA", 
    "FIREBASE", "GIT", "API", "OOP", "TAILWIND"
  ];

  // Initialize node details
  const nodes = useMemo(() => {
    const arr: NodeData[] = [];
    skills.forEach((skill, idx) => {
      arr.push({
        id: skill,
        name: skill,
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003
        ),
        seed: Math.random() * 100
      });
    });
    return arr;
  }, []);

  // Generate background binary particles
  const particleCount = 120;
  const particlesPos = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
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
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate graph group and handle mouse parallax
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.04;
      
      const targetX = mouse.x * 2.5;
      const targetY = mouse.y * 2.5;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.04);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.04);
    }

    // Animate and float node positions
    nodes.forEach((node) => {
      node.pos.add(node.velocity);

      // Bounce within bounds
      if (Math.abs(node.pos.x) > 6) node.velocity.x *= -1;
      if (Math.abs(node.pos.y) > 4) node.velocity.y *= -1;
      if (Math.abs(node.pos.z) > 4) node.velocity.z *= -1;
      
      // Floating sinusoidal motion
      node.pos.y += Math.sin(time * 0.5 + node.seed) * 0.0015;
    });

    // Draw dynamic connections between close nodes
    const linesGeo = linesRef.current?.geometry;
    if (linesGeo) {
      const linePositions: number[] = [];
      const maxDistance = 5.0;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = nodes[i].pos.distanceTo(nodes[j].pos);
          if (dist < maxDistance) {
            linePositions.push(
              nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z,
              nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z
            );
          }
        }
      }
      linesGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
      linesGeo.attributes.position.needsUpdate = true;
    }

    // Orbit drift background binary particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#EDEDED" />

      {/* 3D Floating Skill Nodes */}
      {nodes.map((node) => (
        <group key={node.id} position={node.pos}>
          {/* Node core dot indicator */}
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#737373" transparent opacity={0.7} />
          </mesh>
        </group>
      ))}

      {/* Dynamic Network Connecting Line Segments */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#737373"
          transparent
          opacity={0.16}
          linewidth={1}
          depthWrite={false}
        />
      </lineSegments>

      {/* Floating Binary dust particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlesPos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#EDEDED"
          transparent
          opacity={0.22}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          map={particleTexture || undefined}
        />
      </points>
    </group>
  );
}
