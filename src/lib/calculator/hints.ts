import type { CalculatorHint } from "@/types/calculator";

/**
 * Calcula os hints de nota necessária para aprovação direta e acesso à N3.
 */

const DIRECT_APPROVAL = 6.0;
const N3_ACCESS = 4.0;

/**
 * Dado um valor de N1, calcula quanto precisa na N2 (média)
 */
export function calcN2Hint(n1: number): CalculatorHint {
  return {
    direct: Math.max(0, Math.min(10, 12 - n1)),
    n3Access: Math.max(0, Math.min(10, 8 - n1)),
  };
}

/**
 * Dado um valor de N2, calcula quanto precisa na N1
 */
export function calcN1Hint(n2: number): CalculatorHint {
  return {
    direct: Math.max(0, Math.min(10, 12 - n2)),
    n3Access: Math.max(0, Math.min(10, 8 - n2)),
  };
}

/**
 * Dado valor N2 necessário e um dos campos da N2,
 * calcula quanto precisa no campo restante.
 * N2 = (Parcial + Institucional) / 2
 * Se Parcial preenchido: INST = 2 * N2_alvo - Parcial
 */
export function calcN2PartialHint(
  n2Target: number,
  institutional: number
): CalculatorHint {
  const val = Math.max(0, Math.min(10, 2 * n2Target - institutional));
  return { direct: val, n3Access: val };
}

export function calcN2InstitutionalHint(
  n2Target: number,
  partial: number
): CalculatorHint {
  const val = Math.max(0, Math.min(10, 2 * n2Target - partial));
  return { direct: val, n3Access: val };
}
