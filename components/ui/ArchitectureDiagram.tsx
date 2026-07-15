"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface FlowNode {
  id: string;
  label: string;
  sublabel: string;
  color: string;
  row: number;
  col: number;
}

const nodes: FlowNode[] = [
  { id: "input",    label: "User Input",           sublabel: "Chat UI Terminal",         color: "#14B8A6", row: 0, col: 0 },
  { id: "route",    label: "Next.js Server Action", sublabel: "API Route Handler",        color: "#10B981", row: 0, col: 1 },
  { id: "context",  label: "System Prompt",         sublabel: "Context Assembly",          color: "#10B981", row: 0, col: 2 },
  { id: "llm",      label: "LLM Engine",            sublabel: "Groq · Llama 3.1-8B",      color: "#3B82F6", row: 1, col: 2 },
  { id: "format",   label: "Response Pipeline",     sublabel: "Stream + Format",           color: "#3B82F6", row: 1, col: 1 },
  { id: "output",   label: "Rendered Output",       sublabel: "Terminal UI Render",        color: "#14B8A6", row: 1, col: 0 },
];

// Arrow connections: from → to
const connections: [string, string][] = [
  ["input", "route"],
  ["route", "context"],
  ["context", "llm"],
  ["llm", "format"],
  ["format", "output"],
];

export default function ArchitectureDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Animate nodes in sequence
    nodeRefs.current.forEach((node, i) => {
      if (node) {
        tl.fromTo(
          node,
          { opacity: 0, scale: 0.8, y: 12 },
          { opacity: 1, scale: 1, y: 0, duration: 0.35 },
          i * 0.12
        );
      }
    });

    // Animate arrows in sequence after nodes
    arrowRefs.current.forEach((arrow, i) => {
      if (arrow) {
        tl.fromTo(
          arrow,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.3, transformOrigin: "left center" },
          0.3 + i * 0.12
        );
      }
    });

    // Pulse animation on the data flow arrows
    arrowRefs.current.forEach((arrow) => {
      if (arrow) {
        gsap.to(arrow.querySelector(".flow-dot"), {
          x: "100%",
          duration: 1.8,
          repeat: -1,
          ease: "none",
          delay: 1,
        });
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Position helpers
  const getNodePosition = (node: FlowNode) => {
    const colPercent = node.col * 33.33;
    const rowPercent = node.row * 50;
    return { left: `${colPercent}%`, top: `${rowPercent}%` };
  };

  const getNodeIndex = (id: string) => nodes.findIndex((n) => n.id === id);

  return (
    <div ref={containerRef} className="w-full py-4">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse shadow-[0_0_8px_#3B82F6]" />
        <span className="text-[9px] font-mono text-[#a3a3a3] uppercase tracking-widest font-bold">
          System Architecture · Data Flow
        </span>
      </div>

      {/* Flow diagram container */}
      <div className="relative w-full" style={{ aspectRatio: "3 / 1.1", minHeight: "180px" }}>
        {/* Nodes */}
        {nodes.map((node, i) => {
          const pos = getNodePosition(node);
          return (
            <div
              key={node.id}
              ref={(el) => { nodeRefs.current[i] = el; }}
              className="absolute flex flex-col items-center justify-center text-center p-2 sm:p-3 rounded-xl border transition-all duration-300 hover:scale-105"
              style={{
                left: pos.left,
                top: pos.top,
                width: "30%",
                height: "42%",
                borderColor: `${node.color}40`,
                backgroundColor: `${node.color}08`,
                boxShadow: `0 0 20px ${node.color}10`,
              }}
            >
              <span
                className="text-[10px] sm:text-xs font-bold font-mono tracking-wide leading-tight"
                style={{ color: node.color }}
              >
                {node.label}
              </span>
              <span className="text-[8px] sm:text-[10px] font-mono text-[#737373] mt-0.5 leading-tight">
                {node.sublabel}
              </span>
            </div>
          );
        })}

        {/* Connection arrows */}
        {connections.map(([fromId, toId], i) => {
          const fromNode = nodes[getNodeIndex(fromId)];
          const toNode = nodes[getNodeIndex(toId)];
          if (!fromNode || !toNode) return null;

          const isHorizontal = fromNode.row === toNode.row;
          const isDownward = !isHorizontal && toNode.row > fromNode.row;
          const isUpward = !isHorizontal && toNode.row < fromNode.row;

          // Calculate arrow position
          let arrowStyle: React.CSSProperties = {};
          let arrowClass = "";

          if (isHorizontal) {
            // Horizontal arrow between columns
            const startCol = Math.min(fromNode.col, toNode.col);
            const left = `${startCol * 33.33 + 30}%`;
            const top = `${fromNode.row * 50 + 21}%`;
            arrowStyle = {
              left,
              top,
              width: "3.33%",
              height: "2px",
              background: `linear-gradient(90deg, ${fromNode.color}80, ${toNode.color}80)`,
            };
            arrowClass = "absolute";
          } else if (isDownward) {
            // Vertical arrow going down (context → llm)
            const left = `${fromNode.col * 33.33 + 15}%`;
            const top = `${fromNode.row * 50 + 42}%`;
            arrowStyle = {
              left,
              top,
              width: "2px",
              height: "8%",
              background: `linear-gradient(180deg, ${fromNode.color}80, ${toNode.color}80)`,
            };
            arrowClass = "absolute";
          } else if (isUpward) {
            // Vertical arrow going up
            const left = `${fromNode.col * 33.33 + 15}%`;
            const top = `${toNode.row * 50 + 42}%`;
            arrowStyle = {
              left,
              top,
              width: "2px",
              height: "8%",
              background: `linear-gradient(0deg, ${fromNode.color}80, ${toNode.color}80)`,
            };
            arrowClass = "absolute";
          }

          return (
            <div
              key={`${fromId}-${toId}`}
              ref={(el) => { arrowRefs.current[i] = el; }}
              className={`${arrowClass} rounded-full overflow-hidden`}
              style={arrowStyle}
            >
              <div
                className="flow-dot absolute rounded-full"
                style={{
                  width: isHorizontal ? "6px" : "4px",
                  height: isHorizontal ? "4px" : "6px",
                  backgroundColor: toNode.color,
                  boxShadow: `0 0 8px ${toNode.color}`,
                  top: isHorizontal ? "-1px" : "0",
                  left: isHorizontal ? "0" : "-1px",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-[#262626]/50">
        {[
          { label: "Client Layer", color: "#14B8A6" },
          { label: "Server Layer", color: "#10B981" },
          { label: "AI Engine", color: "#3B82F6" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}60` }}
            />
            <span className="text-[9px] font-mono text-[#737373] uppercase tracking-wider">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
