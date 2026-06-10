"use client";

import type { CalculatorDerived } from "@/types/calculator";
import { SectionCard } from "./ui/section-card";
import { InfoBanner } from "./ui/info-banner";
import { formatGrade, formatStatus } from "@/lib/calculator/format";

interface CalculatorSummaryProps {
  derived: CalculatorDerived;
}

export function CalculatorSummary({ derived }: CalculatorSummaryProps) {
  const { n1, n2, partialAverage, status, requiredN3 } = derived;

  const statusColor = {
    idle: "text-[#4d6a88]",
    approved_direct: "text-emerald-400",
    failed_direct: "text-red-400",
    needs_n3: "text-amber-400",
    approved_after_n3: "text-emerald-400",
    failed_after_n3: "text-red-400",
  }[status];

  return (
    <div>
      <p className="font-sans text-[10.5px] font-bold text-[#4d6a88] uppercase tracking-[0.12em] mb-[9px]">
        Resumo
      </p>
      <SectionCard>
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 font-mono text-[13px] sm:text-sm mb-4 flex-wrap">
          <span className="text-emerald-400 font-medium">{formatGrade(n1)}</span>
          <span className="text-[#4d6a88]">+</span>
          <span className="text-purple-400 font-medium">{formatGrade(n2)}</span>
          <span className="text-[#4d6a88]">÷ 2 =</span>
          <span className="text-[#e2e8f0] font-bold text-[15px] sm:text-base">
            {formatGrade(partialAverage)}
          </span>
          <span className="text-[#7a98b8] text-[10px] font-sans font-semibold uppercase tracking-wider">
            MÉD. PARCIAL
          </span>
        </div>
        <div className="border-t border-[#1e2d45] pt-4">
          <div className={`text-center font-sans text-[13px] sm:text-sm font-semibold ${statusColor} transition-colors duration-300`}>
            {formatStatus(status)}
          </div>
          {status === "needs_n3" && requiredN3 !== null && (
            <div className="text-center font-sans text-[11px] text-[#7a98b8] mt-1">
              Precisa de{" "}
              <span className="text-amber-400 font-semibold">
                {formatGrade(requiredN3)}
              </span>{" "}
              na N3 para aprovação
            </div>
          )}
        </div>
      </SectionCard>
      <InfoBanner message="Preencha as notas que você já tem para ver o que precisa." />
    </div>
  );
}
