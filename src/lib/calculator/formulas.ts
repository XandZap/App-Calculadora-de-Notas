/**
 * Funções matemáticas puras para cálculos de notas.
 * Todas são funções puras: mesmo input → mesmo output, sem side effects.
 */

/** N2 = (Parcial + Institucional) / 2 */
export function calcN2(partial: number, institutional: number): number {
  return (partial + institutional) / 2;
}

/** N1 (período 1-2) = (Parcial1 + Institucional1) / 2 */
export function calcN1(partial: number, institutional: number): number {
  return (partial + institutional) / 2;
}

/** N1 (período 3-8) = Institucional (apenas, sem parcial) */
export function getN1Simple(institutional: number): number {
  return institutional;
}

/** Média Parcial = (N1 + N2) / 2 */
export function calcPartialAverage(n1: number, n2: number): number {
  return (n1 + n2) / 2;
}

/** Média Final = (Média Parcial + N3) / 2 */
export function calcFinalAverage(partialAvg: number, n3: number): number {
  return (partialAvg + n3) / 2;
}

/** Nota necessária na N3 para atingir média final 5.0 */
export function calcRequiredN3(partialAverage: number): number {
  return Math.max(0, 10 - partialAverage);
}
