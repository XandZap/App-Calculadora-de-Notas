/**
 * Utilitários de formatação para exibição de valores.
 */
import { PLACEHOLDER } from "./constants";

/** Formata número para exibição, ou retorna placeholder */
export function formatGrade(value: number | null): string {
  if (value === null || value === undefined) return PLACEHOLDER;
  return value.toFixed(1);
}

/** Formata com símbolo de aprovação/reprovação */
export function formatStatus(status: string): string {
  const labels: Record<string, string> = {
    idle: PLACEHOLDER,
    approved_direct: "Aprovado Direto! ✅",
    failed_direct: "Reprovado Direto ❌",
    needs_n3: "Prova Final (N3) necessária",
    approved_after_n3: "Aprovado após N3! ✅",
    failed_after_n3: "Reprovado após N3 ❌",
  };
  return labels[status] ?? PLACEHOLDER;
}
