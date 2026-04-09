"use client";

import type { DepthLevel } from "@/content/types";

const levels: { value: DepthLevel; label: string; dot: string }[] = [
  { value: "basic", label: "Basic", dot: "bg-green-500" },
  { value: "expected", label: "Expected", dot: "bg-yellow-500" },
  { value: "deep", label: "Deep", dot: "bg-red-500" },
];

interface DepthFilterProps {
  active: DepthLevel;
  onChange: (level: DepthLevel) => void;
  showTraps: boolean;
  onToggleTraps: () => void;
  lastHourMode: boolean;
  onToggleLastHour: () => void;
}

export default function DepthFilter({
  active,
  onChange,
  showTraps,
  onToggleTraps,
  lastHourMode,
  onToggleLastHour,
}: DepthFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Depth levels */}
      <div className="flex bg-gray-900 border border-gray-800 rounded-lg p-1 gap-1">
        {levels.map(({ value, label, dot }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              active === value
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${dot}`} />
            {label}
          </button>
        ))}
      </div>

      {/* Trap toggle */}
      <button
        onClick={onToggleTraps}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
          showTraps
            ? "bg-orange-500/20 border-orange-500/40 text-orange-300"
            : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200"
        }`}
      >
        ⚠ Traps
      </button>

      {/* Last 1 Hour Mode */}
      <button
        onClick={onToggleLastHour}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
          lastHourMode
            ? "bg-indigo-600/30 border-indigo-500/50 text-indigo-300"
            : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200"
        }`}
      >
        ⏱ Last 1 Hour
      </button>
    </div>
  );
}
