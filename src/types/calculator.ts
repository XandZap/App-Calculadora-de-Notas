export type PeriodType = "1-2" | "3-8";

export type FieldEvalType = "none" | "with-field";

export type CalculationStatus =
  | "idle"
  | "approved_direct"
  | "failed_direct"
  | "needs_n3"
  | "approved_after_n3"
  | "failed_after_n3";

export interface CalculatorInput {
  period: PeriodType;
  fieldEvaluation: FieldEvalType;
  n1Partial: number | null;
  n1Institutional: number | null;
  n2Partial: number | null;
  n2Institutional: number | null;
  n2FieldScore: number | null;
  n3Final: number | null;
}

export interface CalculatorDerived {
  n1: number | null;
  n2: number | null;
  partialAverage: number | null;
  finalAverage: number | null;
  status: CalculationStatus;
  requiredN3: number | null;
  isN3Enabled: boolean;
}

export type CalculatorAction =
  | { type: "SET_PERIOD"; payload: PeriodType }
  | { type: "SET_FIELD_EVAL"; payload: FieldEvalType }
  | { type: "SET_N1_PARTIAL"; payload: number | null }
  | { type: "SET_N1_INSTITUTIONAL"; payload: number | null }
  | { type: "SET_N2_PARTIAL"; payload: number | null }
  | { type: "SET_N2_INSTITUTIONAL"; payload: number | null }
  | { type: "SET_N2_FIELD_SCORE"; payload: number | null }
  | { type: "SET_N3_FINAL"; payload: number | null }
  | { type: "RESET" };
