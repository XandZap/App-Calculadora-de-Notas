"use client";

import type {
  CalculatorDerived,
  CalculatorInput,
  CalculatorHints,
} from "@/types/calculator";
import { SectionCard } from "./ui/section-card";
import { InfoBanner } from "./ui/info-banner";
import { formatGrade, formatStatus } from "@/lib/calculator/format";

interface CalculatorSummaryProps {
  derived: CalculatorDerived;
  input: CalculatorInput;
  hints: CalculatorHints;
}

export function CalculatorSummary({
  derived,
  input,
  hints,
}: CalculatorSummaryProps) {
  const { n1, n2, partialAverage, finalAverage, status, requiredN3 } = derived;

  const statusColor = {
    idle: "text-[#4d6a88]",
    approved_direct: "text-emerald-400",
    failed_direct: "text-red-400",
    needs_n3: "text-amber-400",
    approved_after_n3: "text-emerald-400",
    failed_after_n3: "text-red-400",
  }[status];

  const showDirect = partialAverage !== null;
  const approvedDirect = partialAverage !== null && partialAverage >= 6;

  let directMessage: React.ReactNode = null;

  if (showDirect && !approvedDirect) {
    if (input.n2Institutional === null && hints.n2Institutional !== null) {
      const need = hints.n2Institutional.direct;
      directMessage =
        need === null ? (
          <>
            Não é possível passar direto pela N2 Institucional — você vai para a{" "}
            <span className="text-amber-400 font-semibold">Prova Final</span>.
          </>
        ) : need <= 0 ? (
          <>Qualquer nota na N2 Institucional já garante aprovação direta.</>
        ) : (
          <>
            Para passar direto você precisa de{" "}
            <span className="text-emerald-400 font-semibold">
              {formatGrade(need)}
            </span>{" "}
            na N2 Institucional.
          </>
        );
    } else if (
      input.period === "1-2" &&
      input.n1Institutional === null &&
      hints.n1Institutional !== null
    ) {
      const need = hints.n1Institutional.direct;
      directMessage =
        need === null ? (
          <>
            Não é possível passar direto pela N1 Institucional — você vai para a{" "}
            <span className="text-amber-400 font-semibold">Prova Final</span>.
          </>
        ) : need <= 0 ? (
          <>Qualquer nota na N1 Institucional já garante aprovação direta.</>
        ) : (
          <>
            Para passar direto você precisa de{" "}
            <span className="text-emerald-400 font-semibold">
              {formatGrade(need)}
            </span>{" "}
            na N1 Institucional.
          </>
        );
    } else {
      directMessage = (
        <>
          As notas atuais não atingem a média{" "}
          <span className="text-emerald-400 font-semibold">6.0</span> para
          aprovação direta.
        </>
      );
    }
  }

  return (
    <div>
      <p className="font-sans text-[10.5px] font-bold text-[#4d6a88] uppercase tracking-[0.12em] mb-[9px]">
        Resumo
      </p>

      {/* Aprovação Direta (sem N3) */}
      <SectionCard>
        <p className="font-sans text-[10px] font-bold text-emerald-400/80 uppercase tracking-[0.12em] mb-3">
          Aprovação Direta — sem N3
        </p>
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 font-mono text-sm mb-4 flex-wrap">
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
        <div className="border-t border-[#1e2d45] pt-4 text-center">
          {!showDirect && (
            <p className="font-sans text-[11px] text-[#7a98b8]">
              Preencha N1 e N2 para ver quanto falta.
            </p>
          )}
          {showDirect && approvedDirect && (
            <p className="font-sans text-sm font-semibold text-emerald-400">
              Aprovado Direto! ✅
            </p>
          )}
          {showDirect && !approvedDirect && (
            <p className="font-sans text-[12px] text-[#7a98b8] leading-relaxed">
              {directMessage}
            </p>
          )}
        </div>
      </SectionCard>

      {/* Prova Final (N3) */}
      <div className="mt-[14px]">
        <SectionCard>
          <p className="font-sans text-[10px] font-bold text-amber-400/80 uppercase tracking-[0.12em] mb-3">
            Prova Final — N3
          </p>
          <div className={`text-center font-sans text-sm font-semibold ${statusColor} transition-colors duration-300`}>
            {formatStatus(status)}
          </div>

          {status === "needs_n3" && requiredN3 !== null && (
            <div className="text-center font-sans text-[12px] text-[#7a98b8] mt-1">
              Precisa de{" "}
              <span className="text-amber-400 font-semibold">
                {formatGrade(requiredN3)}
              </span>{" "}
              na N3 para ser aprovado (Média Final ≥ 5.0).
            </div>
          )}

          {(status === "approved_after_n3" || status === "failed_after_n3") &&
            finalAverage !== null && (
              <div className="text-center font-sans text-[12px] text-[#7a98b8] mt-1">
                Média Final:{" "}
                <span className={`font-semibold ${statusColor}`}>
                  {formatGrade(finalAverage)}
                </span>
              </div>
            )}

          {status === "approved_direct" && (
            <div className="text-center font-sans text-[11px] text-[#7a98b8] mt-1">
              Você não precisa fazer a N3.
            </div>
          )}

          {status === "failed_direct" && (
            <div className="text-center font-sans text-[11px] text-[#7a98b8] mt-1">
              Média parcial abaixo de 4.0 — N3 indisponível.
            </div>
          )}

          {status === "idle" && (
            <div className="text-center font-sans text-[11px] text-[#7a98b8] mt-1">
              Disponível apenas se a média parcial ficar entre 4.0 e 6.0.
            </div>
          )}
        </SectionCard>
      </div>

      <InfoBanner message="Preencha as notas que você já tem para ver o que precisa." />
    </div>
  );
}
