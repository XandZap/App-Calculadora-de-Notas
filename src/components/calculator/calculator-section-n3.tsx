"use client";

import { Badge } from "./ui/badge";
import { NumberInput } from "./ui/number-input";
import { SectionCard } from "./ui/section-card";
import { formatGrade } from "@/lib/calculator/format";

interface CalculatorSectionN3Props {
  isN3Enabled: boolean;
  n3Final: number | null;
  partialAverage: number | null;
  expanded: boolean;
  onToggle: () => void;
  onN3FinalChange: (value: number | null) => void;
}

export function CalculatorSectionN3({
  isN3Enabled,
  n3Final,
  partialAverage,
  expanded,
  onToggle,
  onN3FinalChange,
}: CalculatorSectionN3Props) {
  return (
    <div>
      <div
        className="flex items-center gap-[11px] mb-3 cursor-pointer select-none"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <Badge label="N3" color="amber" />
        <div className="flex-1">
          <p className="text-[14.5px] font-semibold font-sans text-[#e2e8f0] m-0">
            Prova Final
          </p>
          <p className="text-[11px] text-[#4d6a88] font-sans m-0 mt-0.5">
            {isN3Enabled
              ? "(Média Parcial + N3) ÷ 2 — precisa ≥ 5.0 para aprovação"
              : "Preencha N1 e N2 primeiro"}
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 256 256"
          className={`text-[#4d6a88] transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80a8,8,0,0,1,11.32-11.32L128,165l74.34-74.34a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </div>

      {expanded && (
        <SectionCard>
          <NumberInput
            label="N3 — PROVA FINAL"
            value={n3Final}
            onChange={onN3FinalChange}
            min={0}
            max={10}
            step={0.1}
            disabled={!isN3Enabled}
          />
          {isN3Enabled && partialAverage !== null && (
            <p className="font-sans text-[11px] text-[#4d6a88] mt-[18px] pt-[18px] border-t border-[#1e2d45]">
              Média Parcial atual:{" "}
              <span className="text-[#e2e8f0] font-medium">
                {formatGrade(partialAverage)}
              </span>{" "}
              — Nota mínima na N3:{" "}
              <span className="text-amber-400 font-semibold">
                {formatGrade(Math.max(0, 10 - partialAverage))}
              </span>
            </p>
          )}
        </SectionCard>
      )}
    </div>
  );
}
