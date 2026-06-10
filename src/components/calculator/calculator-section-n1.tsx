"use client";

import type { PeriodType, CalculatorHints } from "@/types/calculator";
import { Badge } from "./ui/badge";
import { NumberInput } from "./ui/number-input";
import { SectionCard } from "./ui/section-card";
import { formatHint } from "@/lib/calculator/format";

interface CalculatorSectionN1Props {
  period: PeriodType;
  n1Partial: number | null;
  n1Institutional: number | null;
  hints: CalculatorHints;
  onN1PartialChange: (value: number | null) => void;
  onN1InstitutionalChange: (value: number | null) => void;
}

export function CalculatorSectionN1({
  period,
  n1Partial,
  n1Institutional,
  hints,
  onN1PartialChange,
  onN1InstitutionalChange,
}: CalculatorSectionN1Props) {
  const showTwoInputs = period === "1-2";

  return (
    <SectionCard>
      <div className="flex items-center gap-[11px] mb-[18px]">
        <Badge label="N1" color="emerald" />
        <div className="flex-1">
          <p className="text-[14.5px] font-semibold font-sans text-[#e2e8f0] m-0">
            Nota 1 — Institucional
          </p>
          {showTwoInputs && (
            <p className="text-[11px] text-[#4d6a88] font-sans m-0 mt-0.5">
              (Parcial + Institucional) ÷ 2
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {showTwoInputs && (
          <NumberInput
            label="N1 PARCIAL"
            value={n1Partial}
            onChange={onN1PartialChange}
            min={0}
            max={10}
            step={0.1}
            hint={
              hints.n1Partial !== null
                ? `Passar direto: Parcial ${formatHint(hints.n1Partial.direct)} · Acessar N3: ${formatHint(hints.n1Partial.n3Access)} na Parcial basta.`
                : undefined
            }
          />
        )}
        <NumberInput
          label="N1 INSTITUCIONAL"
          value={n1Institutional}
          onChange={onN1InstitutionalChange}
          min={0}
          max={10}
          step={0.1}
          hint={
            hints.n1Institutional !== null
              ? `Passar direto: Institucional ${formatHint(hints.n1Institutional.direct)} · Acessar N3: ${formatHint(hints.n1Institutional.n3Access)} na Institucional basta.`
              : undefined
          }
        />
      </div>
    </SectionCard>
  );
}
