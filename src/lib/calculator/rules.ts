import type {
  CalculationStatus,
  FieldEvalType,
  PeriodType,
} from "@/types/calculator";
import { APPROVAL_THRESHOLDS } from "./constants";

/**
 * Resolve o status acadêmico com base na Média Parcial e Final.
 */
export function resolveStatus(
  partialAverage: number | null,
  finalAverage: number | null
): CalculationStatus {
  if (partialAverage === null) return "idle";
  if (partialAverage >= APPROVAL_THRESHOLDS.DIRECT_APPROVAL)
    return "approved_direct";
  if (partialAverage < APPROVAL_THRESHOLDS.DIRECT_FAILURE)
    return "failed_direct";
  if (finalAverage === null) return "needs_n3";
  if (finalAverage >= APPROVAL_THRESHOLDS.FINAL_APPROVAL)
    return "approved_after_n3";
  return "failed_after_n3";
}

/**
 * Indica se a N3 deve ser habilitada para input.
 * Condição: 4.0 ≤ Média Parcial < 6.0
 */
export function shouldEnableN3(partialAverage: number | null): boolean {
  if (partialAverage === null) return false;
  return (
    partialAverage >= APPROVAL_THRESHOLDS.DIRECT_FAILURE &&
    partialAverage < APPROVAL_THRESHOLDS.DIRECT_APPROVAL
  );
}

/**
 * Retorna o valor máximo para o input N2 Institucional
 * baseado na presença de avaliação de campo.
 */
export function getN2MaxInstitutional(fieldEval: FieldEvalType): number {
  return fieldEval === "with-field" ? 9 : 10;
}

/**
 * Verifica se a avaliação de campo deve ser exibida.
 * Só aparece no período 3-8.
 */
export function shouldShowFieldEval(period: PeriodType): boolean {
  return period === "3-8";
}
