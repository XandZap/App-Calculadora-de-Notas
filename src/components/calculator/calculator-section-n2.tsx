"use client";

import type { FieldEvalType } from "@/types/calculator";
import { Badge } from "./ui/badge";
import { NumberInput } from "./ui/number-input";
import { SectionCard } from "./ui/section-card";
import { getN2MaxInstitutional } from "@/lib/calculator/rules";

interface CalculatorSectionN2Props {
  fieldEvaluation: FieldEvalType;
  n2Partial: number | null;
  n2Institutional: number | null;
  n2FieldScore: number | null;
  onN2PartialChange: (value: number | null) => void;
  onN2InstitutionalChange: (value: number | null) => void;
  onN2FieldScoreChange: (value: number | null) => void;
}

export function CalculatorSectionN2({
  fieldEvaluation,
  n2Partial,
  n2Institutional,
  n2FieldScore,
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
        />
        <NumberInput
          label="N2 INSTITUCIONAL"
          value={n2Institutional}
          onChange={onN2InstitutionalChange}
          min={0}
          max={n2Max}
          step={0.1}
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
    </SectionCard>
  );
}
