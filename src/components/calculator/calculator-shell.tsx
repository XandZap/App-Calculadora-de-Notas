"use client";

import { useCalculator } from "@/hooks/use-calculator";
import { shouldShowFieldEval } from "@/lib/calculator/rules";

import { CalculatorHeader } from "./calculator-header";
import { CalculatorPeriodSelector } from "./calculator-period-selector";
import { CalculatorFieldEval } from "./calculator-field-eval";
import { CalculatorSectionN1 } from "./calculator-section-n1";
import { CalculatorSectionN2 } from "./calculator-section-n2";
import { CalculatorSectionN3 } from "./calculator-section-n3";
import { CalculatorSummary } from "./calculator-summary";
import { CalculatorFooter } from "./calculator-footer";
import { CalculatorFormulas } from "./calculator-formulas";
import { AdSenseBanner } from "./adsense-banner";

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

  return (
    <div className="w-full max-w-[500px] lg:max-w-[920px] mx-auto app-container">
      <CalculatorHeader onClear={reset} />
      <main className="px-4 sm:px-5 lg:px-8 pt-[22px] pb-[50px] lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Coluna Esquerda — Formulário */}
        <div className="space-y-[14px] lg:space-y-[18px]">
          <div>
            <CalculatorPeriodSelector
              value={input.period}
              onChange={setPeriod}
            />
          </div>

          {showFieldEval && (
            <div>
              <CalculatorFieldEval
                value={input.fieldEvaluation}
                onChange={setFieldEvaluation}
              />
            </div>
          )}

          <div>
            <CalculatorSectionN1
              period={input.period}
              n1Partial={input.n1Partial}
              n1Institutional={input.n1Institutional}
              hints={hints}
              onN1PartialChange={setN1Partial}
              onN1InstitutionalChange={setN1Institutional}
            />
          </div>

          <div>
            <CalculatorSectionN2
              fieldEvaluation={input.fieldEvaluation}
              n2Partial={input.n2Partial}
              n2Institutional={input.n2Institutional}
              n2FieldScore={input.n2FieldScore}
              hints={hints}
              onN2PartialChange={setN2Partial}
              onN2InstitutionalChange={setN2Institutional}
              onN2FieldScoreChange={setN2FieldScore}
            />
          </div>

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
            <CalculatorSummary derived={derived} />
            <CalculatorFooter />
            <CalculatorFormulas />
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
