"use client";

import type { FieldEvalType } from "@/types/calculator";

interface CalculatorFieldEvalProps {
  value: FieldEvalType;
  onChange: (value: FieldEvalType) => void;
}

export function CalculatorFieldEval({
  value,
  onChange,
}: CalculatorFieldEvalProps) {
  const checked = value === "with-field";

  return (
    <div>
      <p className="font-sans text-[10.5px] font-bold text-[#4d6a88] uppercase tracking-[0.12em] mb-3">
        Avaliação de Campo (N2)
      </p>
      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange(checked ? "none" : "with-field")}
          className="mt-0.5 w-4 h-4 rounded border-2 border-[#1e2d45] bg-transparent accent-[#8b5cf6] cursor-pointer"
        />
        <div>
          <p className="font-sans text-[13px] font-semibold text-[#7a98b8]">
            Com Avaliação de Campo
          </p>
          <p className="font-sans text-[10.5px] text-[#4d6a88] mt-0.5 leading-relaxed">
            N2 Inst. vale até 9 + campo (1 pt)
          </p>
        </div>
      </label>
    </div>
  );
}
