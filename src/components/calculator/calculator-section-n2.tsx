"use client";

import type { FieldEvalType, CalculatorHints } from "@/types/calculator";
import { Badge } from "./ui/badge";
import { NumberInput } from "./ui/number-input";
import { SectionCard } from "./ui/section-card";
import { getN2MaxInstitutional } from "@/lib/calculator/rules";
import { formatHint } from "@/lib/calculator/format";

interface CalculatorSectionN2Props {
  fieldEvaluation: FieldEvalType;
  n2Partial: number | null;
  n2Institutional: number | null;
  n2FieldScore: number | null;
  hints: CalculatorHints;
  onN2PartialChange: (value: number | null) => void;
  onN2InstitutionalChange: (value: number | null) => void;
  onN2FieldScoreChange: (value: number | null) => void;
}

export function CalculatorSectionN2({
  fieldEvaluation,
  n2Partial,
  n2Institutional,
  n2FieldScore,
  hints,
  onN2PartialChange,
  onN2InstitutionalChange,
  onN2FieldScoreChange,
}: CalculatorSectionN2Props) {
  const n2Max = getN2MaxInstitutional(fieldEvaluation);
  const showFieldEval = fieldEvaluation === "with-field";

  return (
    <SectionCard>
      <div className="flex items-center gap-[11px] mb-[18px]">
        <Badge label="N2" color="purple" />
        <div className="flex-1">
          <p className="text-[14.5px] font-semibold font-sans text-[#e2e8f0] m-0">
            Nota 2
          </p>
          <p className="text-[11px] text-[#4d6a88] font-sans m-0 mt-0.5">
            (Parcial + Institucional) ÷ 2
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <NumberInput
          label="N2 PARCIAL"
          value={n2Partial}
          onChange={onN2PartialChange}
          min={0}
          max={10}
          step={0.1}
          hint={
            hints.n2Partial !== null
              ? `Para passar direto: Parcial ${formatHint(hints.n2Partial.direct)}. Para garantir acesso à N3: Parcial ${formatHint(hints.n2Partial.n3Access)}.`
              : undefined
          }
        />
        <NumberInput
          label="N2 INSTITUCIONAL"
          value={n2Institutional}
          onChange={onN2InstitutionalChange}
          min={0}
          max={n2Max}
          step={0.1}
          hint={
            hints.n2Institutional !== null
              ? `Passar direto: Institucional ${formatHint(hints.n2Institutional.direct)} · Acessar N3: ${formatHint(hints.n2Institutional.n3Access)} na Institucional basta.`
              : undefined
          }
        />
        {showFieldEval && (
          <NumberInput
            label="AVALIAÇÃO DE CAMPO"
            value={n2FieldScore}
            onChange={onN2FieldScoreChange}
            min={0}
            max={1}
            step={0.1}
          />
        )}
      </div>
      {hints.n2Block !== null && (
        <div className="mt-4 pt-4 border-t border-[#1e2d45]">
          <p className="font-sans text-[11px] text-[#7a98b8] leading-relaxed">
            Para passar direto: N2 <span className="text-emerald-400 font-semibold">≥ {hints.n2Block.direct?.toFixed(1)}</span>.
            Para garantir acesso à N3: N2 <span className="text-amber-400 font-semibold">≥ {hints.n2Block.n3Access?.toFixed(1)}</span>.
          </p>
        </div>
      )}
    </SectionCard>
  );
}
