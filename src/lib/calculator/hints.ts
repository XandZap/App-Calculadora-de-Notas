import type { CalculatorHint } from "@/types/calculator";

/**
 * Calcula os hints de nota necessária para aprovação direta e acesso à N3.
 * Retorna null quando a nota necessária ultrapassa 10 (impossível).
 */

const rawOrNull = (v: number, max = 10): number | null =>
  v > max ? null : Math.max(0, v);

/**
 * Dado um valor de N1, calcula quanto precisa na N2 (média)
 */
export function calcN2Hint(n1: number): CalculatorHint {
  return {
    direct:   rawOrNull(12 - n1),
    n3Access: rawOrNull(8  - n1),
  };
}

/**
 * Dado um valor de N2, calcula quanto precisa na N1
 */
export function calcN1Hint(n2: number): CalculatorHint {
  return {
    direct:   rawOrNull(12 - n2),
    n3Access: rawOrNull(8  - n2),
  };
}

/**
 * Dado valor N2 necessário e um dos campos da N2,
 * calcula quanto precisa no campo restante.
 * N2 = (Parcial + Institucional + Campo) / 2
 * Se Parcial e Campo preenchidos: INST = 2 * N2_alvo - Parcial - Campo
 */
export function calcN2PartialHint(
  n2DirectTarget: number | null,
  n2N3Target: number | null,
  institutional: number,
  fieldScore = 0
): CalculatorHint {
  const calc = (t: number | null): number | null => {
    if (t === null) return null;
    return rawOrNull(2 * t - institutional - fieldScore);
  };
  return { direct: calc(n2DirectTarget), n3Access: calc(n2N3Target) };
}

export function calcN2InstitutionalHint(
  n2DirectTarget: number | null,
  n2N3Target: number | null,
  partial: number,
  fieldScore = 0
): CalculatorHint {
  const calc = (t: number | null): number | null => {
    if (t === null) return null;
    return rawOrNull(2 * t - partial - fieldScore);
  };
  return { direct: calc(n2DirectTarget), n3Access: calc(n2N3Target) };
}
