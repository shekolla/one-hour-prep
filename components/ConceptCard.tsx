"use client";

import { useState } from "react";
import type { Concept, DepthLevel } from "@/content/types";

const depthConfig = {
  basic: { label: "Basic", dot: "bg-green-500", text: "text-green-400", border: "border-green-500/30", bg: "bg-green-500/5" },
  expected: { label: "Expected", dot: "bg-yellow-500", text: "text-yellow-400", border: "border-yellow-500/30", bg: "bg-yellow-500/5" },
  deep: { label: "Deep", dot: "bg-red-500", text: "text-red-400", border: "border-red-500/30", bg: "bg-red-500/5" },
};

interface ConceptCardProps {
  concept: Concept;
  activeDepth: DepthLevel;
  showTraps: boolean;
  highlighted?: boolean;
}

export default function ConceptCard({ concept, activeDepth, showTraps, highlighted }: ConceptCardProps) {
  const [showInterview, setShowInterview] = useState(false);

  const levelsToShow: DepthLevel[] =
    activeDepth === "basic"
      ? ["basic"]
      : activeDepth === "expected"
      ? ["basic", "expected"]
      : ["basic", "expected", "deep"];

  return (
    <div
      id={`concept-${concept.id}`}
      className={`bg-gray-900 rounded-xl p-6 space-y-4 border transition-all ${
        highlighted ? "border-indigo-500/50 ring-1 ring-indigo-500/20" : "border-gray-800"
      }`}
    >
      <h3 className="text-white font-semibold text-lg">{concept.title}</h3>

      {/* Depth levels */}
      <div className="space-y-3">
        {levelsToShow.map((level) => {
          const cfg = depthConfig[level];
          return (
            <div key={level} className={`rounded-lg p-4 border ${cfg.border} ${cfg.bg}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                <span className={`text-xs font-semibold uppercase tracking-wider ${cfg.text}`}>
                  {cfg.label}
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{concept[level]}</p>
            </div>
          );
        })}
      </div>

      {/* Interview Answer toggle */}
      <button
        onClick={() => setShowInterview((v) => !v)}
        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
      >
        <span>🎤</span>
        <span>{showInterview ? "Hide" : "Show"} Interview Answer</span>
      </button>
      {showInterview && (
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
          <p className="text-indigo-200 text-sm leading-relaxed">{concept.interviewAnswer}</p>
        </div>
      )}

      {/* Trap */}
      {showTraps && (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-orange-400 text-xs font-semibold uppercase tracking-wider">
              ⚠ Trap
            </span>
          </div>
          <p className="text-orange-200 text-sm leading-relaxed">{concept.trap}</p>
        </div>
      )}
    </div>
  );
}
