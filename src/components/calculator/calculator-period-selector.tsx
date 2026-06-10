"use client";

import type { PeriodType } from "@/types/calculator";
import { PERIOD_OPTIONS } from "@/lib/calculator/constants";
import { OptionCard } from "./ui/option-card";

interface CalculatorPeriodSelectorProps {
  value: PeriodType;
  onChange: (value: PeriodType) => void;
}

export function CalculatorPeriodSelector({
  value,
  onChange,
}: CalculatorPeriodSelectorProps) {
  return (
    <div>
      <p className="font-sans text-[10.5px] font-bold text-[#4d6a88] uppercase tracking-[0.12em] mb-3">
        Período
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PERIOD_OPTIONS.map((option) => (
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
