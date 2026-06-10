import type { FieldEvalType, PeriodType } from "@/types/calculator";
import { INPUT_LIMITS } from "./constants";
import { getN2MaxInstitutional } from "./rules";

/**
 * Clampa um valor entre min e max e arredonda para 1 casa decimal.
 */
export function clampAndRound(
  value: number,
  min: number,
  max: number
): number {
  const clamped = Math.min(Math.max(value, min), max);
  return Math.round(clamped * 10) / 10;
}

/**
 * Converte string vazia ou inválida para null.
 * Útil para onChange de inputs.
 */
export function parseGradeInput(value: string): number | null {
  if (value === "" || value === undefined || value === null) return null;
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? null : parsed;
}

/**
 * Valida se um valor de nota está dentro dos limites permitidos.
 */
export function isValidGrade(
  value: number | null,
  field: string,
  period: PeriodType,
  fieldEval: FieldEvalType
): boolean {
  if (value === null) return true;

  const limits = getLimitsForField(field, period, fieldEval);
  return value >= limits.min && value <= limits.max;
}

function getLimitsForField(
  field: string,
  period: PeriodType,
  fieldEval: FieldEvalType
): { min: number; max: number } {
  switch (field) {
    case "n1Partial":
      return period === "1-2"
        ? INPUT_LIMITS.N1_PARTIAL
        : { min: 0, max: 0 }; // não usado
    case "n1Institutional":
      return INPUT_LIMITS.N1_INSTITUTIONAL;
    case "n2Partial":
      return INPUT_LIMITS.N2_PARTIAL;
    case "n2Institutional":
      return {
        min: 0,
        max: getN2MaxInstitutional(fieldEval),
      };
    case "n2FieldScore":
      return INPUT_LIMITS.N2_FIELD_SCORE;
    case "n3Final":
      return INPUT_LIMITS.N3_FINAL;
    default:
      return { min: 0, max: 10 };
  }
}
