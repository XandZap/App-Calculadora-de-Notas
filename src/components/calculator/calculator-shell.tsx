"use client";

import { useCalculator } from "@/hooks/use-calculator";
import { shouldShowFieldEval, getN2MaxInstitutional } from "@/lib/calculator/rules";
import { formatHint } from "@/lib/calculator/format";

import { AdSenseBanner } from "./adsense-banner";
import { CalculatorFieldEval } from "./calculator-field-eval";
import { CalculatorFooter } from "./calculator-footer";
import { CalculatorFormulas } from "./calculator-formulas";
import { CalculatorHeader } from "./calculator-header";
import { CalculatorPeriodSelector } from "./calculator-period-selector";
import { CalculatorSectionN3 } from "./calculator-section-n3";
import { CalculatorSummary } from "./calculator-summary";
import { GradeSection } from "./ui/grade-section";

export function CalculatorShell() {
  const {
    input,
    derived,
    hints,
    n3Expanded,
    setPeriod,
    setFieldEvaluation,
    setN1Partial,
    setN1Institutional,
    setN2Partial,
    setN2Institutional,
    setN2FieldScore,
    setN3Final,
    toggleN3,
    reset,
  } = useCalculator();

  const showFieldEval = shouldShowFieldEval(input.period);
  const n2Max = getN2MaxInstitutional(input.fieldEvaluation);
  const showTwoInputsN1 = input.period === "1-2";

  return (
    <div className="w-full max-w-[500px] lg:max-w-[920px] mx-auto app-container">
      <CalculatorHeader onClear={reset} />
      <main className="px-4 sm:px-5 lg:px-8 pt-[22px] pb-[50px] lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Coluna Esquerda — Formulário */}
        <div className="space-y-[14px] lg:space-y-[18px]">
          <div>
            <CalculatorPeriodSelector value={input.period} onChange={setPeriod} />
          </div>

          {showFieldEval && (
            <div>
              <CalculatorFieldEval value={input.fieldEvaluation} onChange={setFieldEvaluation} />
            </div>
          )}

          <GradeSection
            badge={{ label: "N1", color: "emerald" }}
            title="Nota 1 — Institucional"
            subtitle={showTwoInputsN1 ? "(Parcial + Institucional) ÷ 2" : undefined}
            inputs={[
              ...(showTwoInputsN1
                ? [{
                    label: "N1 PARCIAL",
                    value: input.n1Partial,
                    onChange: setN1Partial,
                    hint: hints.n1Partial !== null
                      ? `Passar direto: Parcial ${formatHint(hints.n1Partial.direct)} · Acessar N3: ${formatHint(hints.n1Partial.n3Access)} na Parcial basta.`
                      : undefined,
                  }]
                : []),
              {
                label: "N1 INSTITUCIONAL",
                value: input.n1Institutional,
                onChange: setN1Institutional,
                hint: hints.n1Institutional !== null
                  ? `Passar direto: Institucional ${formatHint(hints.n1Institutional.direct)} · Acessar N3: ${formatHint(hints.n1Institutional.n3Access)} na Institucional basta.`
                  : undefined,
              },
            ]}
          />

          <GradeSection
            badge={{ label: "N2", color: "purple" }}
            title="Nota 2"
            subtitle="(Parcial + Institucional) ÷ 2"
            inputs={[
              {
                label: "N2 PARCIAL",
                value: input.n2Partial,
                onChange: setN2Partial,
                hint: hints.n2Partial !== null
                  ? `Para passar direto: Parcial ${formatHint(hints.n2Partial.direct)}. Para garantir acesso à N3: Parcial ${formatHint(hints.n2Partial.n3Access)}.`
                  : undefined,
              },
              {
                label: "N2 INSTITUCIONAL",
                value: input.n2Institutional,
                onChange: setN2Institutional,
                max: n2Max,
                hint: hints.n2Institutional !== null
                  ? `Passar direto: Institucional ${formatHint(hints.n2Institutional.direct)} · Acessar N3: ${formatHint(hints.n2Institutional.n3Access)} na Institucional basta.`
                  : undefined,
              },
              ...(showFieldEval
                ? [{
                    label: "AVALIAÇÃO DE CAMPO",
                    value: input.n2FieldScore,
                    onChange: setN2FieldScore,
                    max: 1,
                  }]
                : []),
            ]}
            bottomBlock={
              hints.n2Block !== null ? (
                <p className="font-sans text-[11px] text-[#7a98b8] leading-relaxed">
                  {hints.n2Block.direct === null ? (
                    <>
                      Aprovação direta impossível — você já vai para a{" "}
                      <span className="text-amber-400 font-semibold">Prova Final</span>. Para acessar a N3: N2{" "}
                      <span className="text-amber-400 font-semibold">≥ {hints.n2Block.n3Access?.toFixed(1) ?? "—"}</span>.
                    </>
                  ) : (
                    <>
                      Para passar direto: N2 <span className="text-emerald-400 font-semibold">≥ {hints.n2Block.direct?.toFixed(1)}</span>.
                      Para garantir acesso à N3: N2 <span className="text-amber-400 font-semibold">≥ {hints.n2Block.n3Access?.toFixed(1)}</span>.
                    </>
                  )}
                </p>
              ) : undefined
            }
          />

          <div>
            <CalculatorSectionN3
              isN3Enabled={derived.isN3Enabled}
              n3Final={input.n3Final}
              partialAverage={derived.partialAverage}
              expanded={n3Expanded}
              onToggle={toggleN3}
              onN3FinalChange={setN3Final}
            />
          </div>
        </div>

        {/* Coluna Direita — Resultados (sticky em desktop) */}
        <div className="mt-[14px] lg:mt-0 space-y-[14px] lg:space-y-[18px]">
          <div className="lg:sticky lg:top-8 lg:space-y-[18px]">
            <CalculatorSummary derived={derived} input={input} hints={hints} />
            <CalculatorFormulas />
            <CalculatorFooter />
          </div>
        </div>

        {/* Banner — full width abaixo das colunas */}
        <div className="lg:col-span-2">
          <AdSenseBanner />
        </div>
      </main>
    </div>
  );
}
