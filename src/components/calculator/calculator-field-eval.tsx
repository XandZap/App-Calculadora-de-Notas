"use client";

import type { FieldEvalType } from "@/types/calculator";
import { FIELD_EVAL_OPTIONS } from "@/lib/calculator/constants";
import { OptionCard } from "./ui/option-card";

interface CalculatorFieldEvalProps {
  value: FieldEvalType;
  onChange: (value: FieldEvalType) => void;
}

export function CalculatorFieldEval({
  value,
  onChange,
}: CalculatorFieldEvalProps) {
  return (
    <div>
      <p className="font-sans text-[10.5px] font-bold text-[#4d6a88] uppercase tracking-[0.12em] mb-3">
        Avaliação de Campo (N2)
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FIELD_EVAL_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
            label={option.label}
            subtitle={option.subtitle}
          />
        ))}
      </div>
    </div>
  );
}
