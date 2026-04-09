"use client";

import { useState, useCallback } from "react";
import type { TreeNode } from "@/content/types";

const importanceColors = {
  critical: { dot: "bg-red-400", line: "border-red-900" },
  high: { dot: "bg-yellow-400", line: "border-yellow-900" },
  medium: { dot: "bg-gray-500", line: "border-gray-800" },
};

interface MentalModelTreeProps {
  tree: TreeNode;
  onConceptSelect: (conceptId: string) => void;
  activeConceptId?: string;
}

interface NodeRowProps {
  node: TreeNode;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onConceptSelect: (conceptId: string) => void;
  activeConceptId?: string;
  level: number;
}

function NodeRow({
  node,
  expandedIds,
  onToggle,
  onConceptSelect,
  activeConceptId,
  level,
}: NodeRowProps) {
  const isExpanded = expandedIds.has(node.id);
  const isActive = node.conceptId === activeConceptId;
  const colors = importanceColors[node.importance];

  if (node.nodeType === "category") {
    const childCount = node.children?.length ?? 0;
    return (
      <div>
        <button
          onClick={() => onToggle(node.id)}
          className="w-full flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-gray-800/60 transition-colors group"
          style={{ paddingLeft: `${level * 16 + 8}px` }}
        >
          <span
            className={`text-gray-500 transition-transform duration-150 text-xs shrink-0 ${
              isExpanded ? "rotate-90" : ""
            }`}
          >
            ▶
          </span>
          <span className="text-gray-200 font-semibold text-sm">{node.label}</span>
          <span className="text-gray-600 text-xs ml-1">({childCount})</span>
        </button>
        {isExpanded && node.children && (
          <div className={`ml-4 border-l-2 ${colors.line} pl-1`}>
            {node.children.map((child) => (
              <NodeRow
                key={child.id}
                node={child}
                expandedIds={expandedIds}
                onToggle={onToggle}
                onConceptSelect={onConceptSelect}
                activeConceptId={activeConceptId}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Concept leaf node
  return (
    <div>
      <button
        onClick={() => node.conceptId && onConceptSelect(node.conceptId)}
        className={`w-full flex items-center gap-2 py-1.5 px-2 rounded-lg transition-colors text-left group ${
          isActive
            ? "bg-indigo-600/15 text-indigo-300"
            : "hover:bg-gray-800/60 text-gray-400 hover:text-gray-200"
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        <div className={`w-2 h-2 rounded-full shrink-0 ${colors.dot}`} />
        <span className="text-sm">{node.label}</span>
      </button>
      {node.relatedIds && node.relatedIds.length > 0 && (
        <div
          className="flex items-center gap-1 py-0.5 px-2"
          style={{ paddingLeft: `${level * 16 + 30}px` }}
        >
          <span className="text-gray-700 text-xs">↳ see also:</span>
          {node.relatedIds.map((relId) => (
            <button
              key={relId}
              onClick={() => onConceptSelect(relId)}
              className="text-gray-600 hover:text-indigo-400 text-xs transition-colors"
            >
              {relId.replace(/-/g, " ")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MentalModelTree({
  tree,
  onConceptSelect,
  activeConceptId,
}: MentalModelTreeProps) {
  const allCategoryIds = (tree.children ?? []).map((n) => n.id);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(allCategoryIds)
  );

  const toggle = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const allExpanded = allCategoryIds.every((id) => expandedIds.has(id));

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(allCategoryIds));
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold text-sm">{tree.label}</span>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-gray-500">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Critical
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" /> High
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <span className="w-2 h-2 rounded-full bg-gray-500 inline-block" /> Medium
            </span>
          </div>
        </div>
        <button
          onClick={toggleAll}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          {allExpanded ? "Collapse all" : "Expand all"}
        </button>
      </div>

      {/* Tree body */}
      <div className="p-3 space-y-0.5">
        {(tree.children ?? []).map((child) => (
          <NodeRow
            key={child.id}
            node={child}
            expandedIds={expandedIds}
            onToggle={toggle}
            onConceptSelect={onConceptSelect}
            activeConceptId={activeConceptId}
            level={0}
          />
        ))}
      </div>

      <div className="px-4 py-2 border-t border-gray-800">
        <p className="text-gray-600 text-xs">Click any concept to jump to its deep-dive card</p>
      </div>
    </div>
  );
}
