import { PLACEHOLDER } from "./constants";
import type { CalculatorHint } from "@/types/calculator";

export function formatGrade(value: number | null): string {
  if (value === null || value === undefined) return PLACEHOLDER;
  // Mostra 2 casas decimais para precisão
  return value.toFixed(2);
}

export function formatGradeShort(value: number | null): string {
  if (value === null || value === undefined) return PLACEHOLDER;
  // Para exibição compacta no resumo, 1 casa
  return value.toFixed(1);
}

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

export function formatHint(value: number | null): string {
  if (value === null) return PLACEHOLDER;
  if (value <= 0) return "qualquer nota";
  return `≥ ${value.toFixed(1)}`;
}
