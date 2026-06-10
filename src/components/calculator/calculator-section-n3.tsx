"use client";

import { Badge } from "./ui/badge";
import { NumberInput } from "./ui/number-input";
import { SectionCard } from "./ui/section-card";
import { formatGrade } from "@/lib/calculator/format";

interface CalculatorSectionN3Props {
  isN3Enabled: boolean;
  n3Final: number | null;
  partialAverage: number | null;
  onN3FinalChange: (value: number | null) => void;
}

export function CalculatorSectionN3({
  isN3Enabled,
  n3Final,
  partialAverage,
  onN3FinalChange,
}: CalculatorSectionN3Props) {
  return (
    <SectionCard>
      <div className="flex items-center gap-[11px] mb-[18px]">
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
      </div>
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
  );
}
