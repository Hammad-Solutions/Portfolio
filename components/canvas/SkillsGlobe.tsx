import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// Suppress THREE.Clock deprecation warning from @react-three/fiber
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return;
  originalWarn(...args);
};

// High-fidelity brand SVG icons for the globe
const ReactIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#61dafb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
  </svg>
);

const NextIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" stroke="#FFFFFF" />
    <path d="M9 17V7l7.5 10H15L10.5 11V17H9z" fill="#FFFFFF" />
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="#68a063">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm8 14.2l-8 4-8-4V8.8l8-4 8 4v7.4z" />
  </svg>
);

const TypeScriptIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="#3178C6">
    <rect x="2" y="2" width="20" height="20" rx="3" />
    <path fill="#FFFFFF" d="M12.5 7.5h-4.5V10h1.6v6.5h1.3V10h1.6V7.5zm5.3 5c-.3-.5-.7-.8-1.2-1-.5-.2-1-.3-1.6-.3s-1.1.1-1.6.3c-.5.2-.8.5-1.1 1-.3.5-.4 1-.4 1.7v2.3h2.3v-2.1c0-.4.1-.7.2-.9.1-.2.3-.3.6-.3s.5.1.6.3c.1.2.2.5.2.9v2.1h2.3v-2.3c.1-.7-.1-1.2-.4-1.7z" />
  </svg>
);

const JavaScriptIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="#F7DF1E">
    <rect x="2" y="2" width="20" height="20" rx="3" />
    <path fill="#000000" d="M18.8 17.2c-.4.7-.9 1.3-1.6 1.7-.7.4-1.5.6-2.4.6-1.3 0-2.3-.4-3-1.3-.4-.5-.6-1.1-.7-2h2.7c.1.5.2.8.5 1.1.3.3.7.4 1.2.4.4 0 .7-.1.9-.3.2-.2.3-.5.3-.8 0-.3-.1-.5-.3-.7-.2-.2-.6-.4-1.2-.6-1-.4-1.8-.8-2.3-1.2-.5-.4-.8-1.1-.8-1.9 0-.8.3-1.4.9-1.9.6-.5 1.4-.7 2.4-.7 1.1 0 1.9.3 2.5.8.6.5.9 1.2.9 2.2h-2.7c0-.5-.2-.8-.4-1-.2-.2-.5-.3-.9-.3-.3 0-.6.1-.8.2-.2.1-.3.3-.3.6 0 .2.1.4.3.5.2.1.6.3 1.2.5 1.1.4 1.9.8 2.3 1.3.4.5.6 1.1.6 1.9-.1.9-.4 1.5-1 1.9z" />
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22">
    <path fill="#3776AB" d="M12 2c-5.5 0-5 2.5-5 5h5v1H5c-2.5 0-3 1.5-3 5s.5 5 3 5h2v-3c0-2.5 2-3 4-3h3V7c0-2.5-1.5-5-5-5z" />
    <path fill="#FFD343" d="M12 22c5.5 0 5-2.5 5-5h-5v-1h7c2.5 0 3-1.5 3-5s-.5-5-3-5h-2v3c0 2.5-2 3-4 3h-3v5c0 2.5 1.5 5 5 5z" />
    <circle cx="9" cy="4.5" r="0.75" fill="#FFF" />
    <circle cx="15" cy="19.5" r="0.75" fill="#FFF" />
  </svg>
);

const PostgresIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="#336791">
    <path d="M12 2a10 10 0 00-10 10c0 4.1 2.5 7.6 6.1 9.1-.1-.3-.2-.7-.2-1.1 0-1.8 1-3.2 2.5-3.8-1.5-.7-2.4-2.2-2.4-3.9v-2.2c0-2.1 1.7-3.8 3.8-3.8h4.4c2.1 0 3.8 1.7 3.8 3.8v2.2c0 1.7-.9 3.2-2.4 3.9 1.5.6 2.5 2 2.5 3.8 0 .4-.1.8-.2 1.1 3.6-1.5 6.1-5 6.1-9.1a10 10 0 00-10-10zm2.2 6.6c.7 0 1.3.6 1.3 1.3v2.2c0 .7-.6 1.3-1.3 1.3h-4.4c-.7 0-1.3-.6-1.3-1.3v-2.2c0-.7.6-1.3 1.3-1.3h4.4z" />
  </svg>
);

const CppIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="#00599c">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5c1.4 0 2.6.6 3.5 1.6l-1.8 1.8c-.4-.5-1-.9-1.7-.9-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5c.7 0 1.3-.4 1.7-.9l1.8 1.8c-.9 1-2.1 1.6-3.5 1.6zm6.5-5H15v-1.5h1.5V9H18v1.5h1.5V12H18v1.5h-1.5V12z" />
  </svg>
);

const JavaIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="#e76f51">
    <path d="M2 18.5a6 6 0 006 6h8a6 6 0 006-6v-3a1 1 0 00-1-1H3a1 1 0 00-1 1v3zM21 8h-4a1 1 0 00-1 1v2a3 3 0 01-3 3H9a3 3 0 01-3-3V9a1 1 0 00-1-1H1a1 1 0 00-1 1v6a6 6 0 006 6h12a6 6 0 006-6V9a1 1 0 00-1-1z" />
    <path d="M14 0c-.5 0-.9.4-.9.9s.4.9.9.9.9-.4.9-.9-.4-.9-.9-.9zm-4 2c-.5 0-.9.4-.9.9s.4.9.9.9.9-.4.9-.9-.4-.9-.9-.9z" />
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="#f05032">
    <path d="M22.6 11.3L12.7 1.4c-.4-.4-1-.4-1.4 0L1.4 11.3c-.4.4-.4 1 0 1.4l9.9 9.9c.4.4 1 .4 1.4 0l9.9-9.9c.4-.4.4-1 0-1.4zM12 18c-1.1 0-2-.9-2-2 0-.6.3-1.1.7-1.4L9 11.7c-.3.1-.6.1-.9.1-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2c0 .6-.3 1.1-.7 1.4l1.7 2.9c.3-.1.6-.1.9-.1 1.1 0 2 .9 2 2s-.9 2-2 2z" />
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="#38bdf8">
    <path d="M12 6.5c-2.4 0-4 1.2-4.8 3.6 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.4 1.7 1.2 1.3 2.6 2.8 5.4 2.8 2.4 0 4-1.2 4.8-3.6-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.4-1.7-1.2-1.3-2.6-2.8-5.4-2.8zm-8 6c-2.4 0-4 1.2-4.8 3.6 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.4 1.7 1.2 1.3 2.6 2.8 5.4 2.8 2.4 0 4-1.2 4.8-3.6-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.4-1.7-1.2-1.3-2.6-2.8-5.4-2.8z" />
  </svg>
);

const HtmlIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="#e34f26">
    <path d="M1.5 22L0 2h24l-1.5 20L12 24 1.5 22zm19-17.5H3.5l1.2 14.5L12 21.2l7.3-2.2 1.2-14.5z" />
  </svg>
);

const CssIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="#264de4">
    <path d="M1.5 22L0 2h24l-1.5 20L12 24 1.5 22zm19-17.5H3.5l.5 6h15.9l-.5 6-7.4 2.2-7.4-2.2-.3-3.5h3l.2 1.8 4.5 1.2 4.5-1.2.3-3.3H4.2l-.5-6h17l-.2 2.5z" />
  </svg>
);

interface SkillNode {
  name: string;
  icon: React.ReactNode;
  pos: THREE.Vector3;
}

const vertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  // Pure wave-based (sine/cosine) function to define continent boundaries (no image files)
  float fbm(vec3 p) {
    float w1 = sin(p.x * 1.8) * cos(p.y * 1.8) + sin(p.y * 1.5) * cos(p.z * 1.5) + sin(p.z * 1.8) * cos(p.x * 1.8);
    float w2 = sin(p.x * 3.6 + uTime * 0.12) * cos(p.y * 3.6) + sin(p.y * 3.0) * cos(p.z * 3.0);
    float w3 = sin(p.z * 7.5) * cos(p.x * 7.5) * 0.5;
    return w1 * 0.55 + w2 * 0.3 + w3 * 0.15;
  }

  void main() {
    vec3 dir = normalize(vPosition);

    float val = fbm(dir * 2.2);
    float threshold = 0.05;

    // Use fwidth to compute screen-space derivatives for smooth, anti-aliased continent borders
    float edgeWidth = fwidth(val) * 1.5;
    float landInfluence = smoothstep(threshold - edgeWidth, threshold + edgeWidth, val);

    // Sleek, cool-toned dark gray color (#3A3F44) for the continent interior
    vec3 fillColor = vec3(0.227, 0.247, 0.267);

    // Dynamic alpha/opacity set to 0.1
    float fillOpacity = 0.15;
    float finalAlpha = landInfluence * fillOpacity;

    // Discard water/ocean pixels completely to let the background Matrix rain shine through
    if (finalAlpha < 0.01) {
      discard;
    }

    // Lambert + Phong lighting model for 3D depth
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(vec3(5.0, 5.0, 5.0));
    float diffuse = max(dot(normal, lightDir), 0.0) * 0.4 + 0.6;

    vec3 viewDir = normalize(vViewPosition);
    vec3 reflectDir = reflect(-lightDir, normal);
    float specular = pow(max(dot(viewDir, reflectDir), 0.0), 32.0) * 0.15;

    // Composite diffuse and specular shading
    vec3 finalColor = fillColor * diffuse + vec3(0.2, 0.2, 0.22) * specular;

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

export default function SkillsGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse, gl } = useThree();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = gl.domElement;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 } // Trigger when at least 5% is visible
    );
    observer.observe(el);
    return () => {
      observer.unobserve(el);
      observer.disconnect();
    };
  }, [gl]);

  const skillList = [
    { name: "REACT", icon: <ReactIcon /> },
    { name: "NEXT.JS", icon: <NextIcon /> },
    { name: "NODE.JS", icon: <NodeIcon /> },
    { name: "TYPESCRIPT", icon: <TypeScriptIcon /> },
    { name: "JAVASCRIPT", icon: <JavaScriptIcon /> },
    { name: "PYTHON", icon: <PythonIcon /> },
    { name: "POSTGRESQL", icon: <PostgresIcon /> },
    { name: "C++", icon: <CppIcon /> },
    { name: "JAVA", icon: <JavaIcon /> },
    { name: "GIT", icon: <GitIcon /> },
    { name: "TAILWIND", icon: <TailwindIcon /> },
    { name: "HTML5", icon: <HtmlIcon /> },
    { name: "CSS3", icon: <CssIcon /> }
  ];

  // Distribute nodes evenly on the surface of a 3D sphere (Fibonacci algorithm)
  const radius = 1.7;
  const nodes = useMemo<SkillNode[]>(() => {
    const arr: SkillNode[] = [];
    const total = skillList.length;
    for (let i = 0; i < total; i++) {
      const phi = Math.acos(-1 + (2 * i) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      arr.push({
        name: skillList[i].name,
        icon: skillList[i].icon,
        pos: new THREE.Vector3(x, y, z)
      });
    }
    return arr;
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0.0 }
  }), []);

  useFrame((state) => {
    if (!isVisible) return;
    const time = state.clock.getElapsedTime();

    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = time;
    }

    // Lerp both x and y rotation coordinate offsets smoothly to completely eliminate mouse jitter
    if (groupRef.current) {
      const targetY = time * 0.65 + mouse.x * 0.8;
      const targetX = -mouse.y * 0.5;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.08);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.08);

      // Gentle floating/oscillation effect
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#00ffff" />

      {/* Earth Map Globe Sphere using custom ShaderMaterial with outlines and transparency */}
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <shaderMaterial
          ref={shaderRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Volumetric ghostly atmospheric outer ring halo */}
      <mesh>
        <sphereGeometry args={[radius + 0.035, 64, 64]} />
        <meshBasicMaterial
          color={new THREE.Color(0x034141)}
          transparent
          opacity={0.02}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Skills floating nodes */}
      {nodes.map((node) => (
        <SkillNodeItem
          key={node.name}
          name={node.name}
          position={node.pos}
          icon={node.icon}
          isVisible={isVisible}
        />
      ))}
    </group>
  );
}

interface SkillNodeItemProps {
  name: string;
  position: THREE.Vector3;
  icon: React.ReactNode;
  isVisible: boolean;
}

function SkillNodeItem({ name, position, icon, isVisible }: SkillNodeItemProps) {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!isVisible) return;
    if (nodeRef.current && containerRef.current) {
      // Get the world position of the node
      const worldPos = new THREE.Vector3();
      nodeRef.current.getWorldPosition(worldPos);

      // Distance from camera to this node
      const dist = state.camera.position.distanceTo(worldPos);

      // Globe center is at (0, 0, 0). Get camera distance to origin.
      const cameraDist = state.camera.position.length();

      // Define bounds for normalized depth interpolation
      const radius = 1.7;
      const minDist = cameraDist - radius;
      const maxDist = cameraDist + radius;

      // Calculate depth value between 0.0 (far/back) and 1.0 (near/front)
      const depth = 1 - (dist - minDist) / (maxDist - minDist);
      const clampedDepth = Math.max(0, Math.min(1, depth));

      // Map depth to opacity & scale to create professional volumetric feel
      const baseOpacity = THREE.MathUtils.lerp(0.12, 0.85, clampedDepth);
      const baseScale = THREE.MathUtils.lerp(0.65, 1.05, clampedDepth);

      // Apply dynamic interactive updates directly to HTML DOM
      containerRef.current.style.opacity = hovered ? "1.0" : `${baseOpacity}`;
      containerRef.current.style.transform = `scale(${hovered ? 1.35 : baseScale})`;
      containerRef.current.style.zIndex = hovered ? "100" : `${Math.round(clampedDepth * 50)}`;

      // Disable interaction for nodes rotated to the back to avoid cursor snapping bugs
      containerRef.current.style.pointerEvents = clampedDepth > 0.45 ? "auto" : "none";
    }
  });

  return (
    <group ref={nodeRef} position={position}>
      <Html distanceFactor={6.2} center>
        <div
          ref={containerRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="flex flex-col items-center gap-1.5 transition-all duration-300 select-none cursor-pointer"
        >
          {/* Circular Glass Card Icon container */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 shadow-md ${hovered
              ? "bg-[#121212] border-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              : "bg-[#0A0A0A]/70 border-[#262626]/80 hover:bg-[#121212] hover:border-[#EDEDED]/30"
              }`}
          >
            <div className={`transition-all duration-300 ${hovered ? "scale-110" : "opacity-95"}`}>
              {icon}
            </div>
          </div>

          {/* Dynamic Premium Capsule Tag name revealed on hover */}
          <div
            className={`font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg transition-all duration-300 border pointer-events-none whitespace-nowrap ${hovered
              ? "bg-[#3B82F6] border-[#3B82F6] text-[#FFFFFF] translate-y-0 opacity-100 scale-100"
              : "bg-[#0A0A0A] border-[#262626] text-[#737373] translate-y-1.5 opacity-0 scale-90"
              }`}
          >
            {name}
          </div>
        </div>
      </Html>
    </group>
  );
}
