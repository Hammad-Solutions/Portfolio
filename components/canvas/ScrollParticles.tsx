"use client";

import React, { useEffect, useRef } from "react";

export default function ScrollParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);

    const isMobile = width < 768;
    if (isMobile) return; // Disable entirely on mobile to save performance as requested

    const particleCount = 450;

    // Compile Shaders
    const vsSource = `
      precision mediump float;
      attribute vec2 aPosition;
      attribute float aSpeed;
      uniform float uTime;
      uniform float uScrollY;
      varying float vOpacity;
      varying float vSpeed;
      void main() {
        vec2 pos = aPosition;
        pos.y = mod(pos.y - uTime * 0.02 - uScrollY * 0.0003 * aSpeed, 2.0) - 1.0;
        gl_Position = vec4(pos, 0.0, 1.0);
        gl_PointSize = 8.0;
        vOpacity = 0.15 + 0.45 * sin(uTime + aSpeed * 10.0);
        vSpeed = aSpeed;
      }
    `;

    const fsSource = `
      precision mediump float;
      varying float vOpacity;
      varying float vSpeed;
      uniform float uTime;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        
        // Draw a ring: thin outline circle (no yellow, no sparkles)
        float ring = step(0.35, dist) * step(dist, 0.5);
        if (ring < 0.1) discard;

        // Strict dark mode palette: mix neon green (#10B981) and neon blue (#3B82F6)
        vec3 greenColor = vec3(0.062, 0.725, 0.505);
        vec3 blueColor = vec3(0.231, 0.509, 0.964);
        vec3 color = mix(greenColor, blueColor, sin(uTime * 1.5 + vSpeed * 6.28) * 0.5 + 0.5);

        gl_FragColor = vec4(color, vOpacity * 0.8);
      }
    `;

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Setup buffers
    const positionData = new Float32Array(particleCount * 2);
    const speedData = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positionData[i * 2] = Math.random() * 2.0 - 1.0; // x
      positionData[i * 2 + 1] = Math.random() * 2.0 - 1.0; // y
      speedData[i] = Math.random() * 0.8 + 0.2;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positionData, gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const speedBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, speedBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, speedData, gl.STATIC_DRAW);
    const aSpeed = gl.getAttribLocation(program, "aSpeed");
    gl.enableVertexAttribArray(aSpeed);
    gl.vertexAttribPointer(aSpeed, 1, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "uTime");
    const uScrollY = gl.getUniformLocation(program, "uScrollY");

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let animationFrameId: number;
    let startTime = Date.now();

    const render = () => {
      const elapsed = (Date.now() - startTime) / 1000.0;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uScrollY, scrollY);
      gl.drawArrays(gl.POINTS, 0, particleCount);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1]" />;
}
