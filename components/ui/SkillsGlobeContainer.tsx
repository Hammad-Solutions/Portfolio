import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import SkillsGlobe from "../canvas/SkillsGlobe";

interface SkillsGlobeContainerProps {
  cameraZ: number;
}

export default function SkillsGlobeContainer({ cameraZ }: SkillsGlobeContainerProps) {
  const [canvasKey, setCanvasKey] = useState(0);

  return (
    <Canvas 
      key={canvasKey}
      camera={{ position: [0, 0, cameraZ], fov: 45 }}
      style={{ touchAction: "pan-y" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          setCanvasKey((prev) => prev + 1);
        });
      }}
    >
      <SkillsGlobe />
    </Canvas>
  );
}
