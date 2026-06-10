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

export function CalculatorShell() {
  const {
    input,
    derived,
    setPeriod,
    setFieldEvaluation,
    setN1Partial,
    setN1Institutional,
    setN2Partial,
    setN2Institutional,
    setN2FieldScore,
    setN3Final,
    reset,
  } = useCalculator();

  const showFieldEval = shouldShowFieldEval(input.period);

  return (
    <div className="w-full max-w-[500px] mx-auto">
      <CalculatorHeader onClear={reset} />
      <main className="px-5 pt-[22px] pb-[50px]">
        <div className="mb-[18px]">
          <CalculatorPeriodSelector
            value={input.period}
            onChange={setPeriod}
          />
        </div>

        {showFieldEval && (
          <div className="mb-[18px]">
            <CalculatorFieldEval
              value={input.fieldEvaluation}
              onChange={setFieldEvaluation}
            />
          </div>
        )}

        <div className="mb-[14px]">
          <CalculatorSectionN1
            period={input.period}
            n1Partial={input.n1Partial}
            n1Institutional={input.n1Institutional}
            onN1PartialChange={setN1Partial}
            onN1InstitutionalChange={setN1Institutional}
          />
        </div>

        <div className="mb-[14px]">
          <CalculatorSectionN2
            fieldEvaluation={input.fieldEvaluation}
            n2Partial={input.n2Partial}
            n2Institutional={input.n2Institutional}
            n2FieldScore={input.n2FieldScore}
            onN2PartialChange={setN2Partial}
            onN2InstitutionalChange={setN2Institutional}
            onN2FieldScoreChange={setN2FieldScore}
          />
        </div>

        <div className="mb-[14px]">
          <CalculatorSectionN3
            isN3Enabled={derived.isN3Enabled}
            n3Final={input.n3Final}
            partialAverage={derived.partialAverage}
            onN3FinalChange={setN3Final}
          />
        </div>

        <div className="mb-[14px]">
          <CalculatorSummary derived={derived} />
        </div>

        <CalculatorFooter />
        <CalculatorFormulas />
      </main>
    </div>
  );
}
