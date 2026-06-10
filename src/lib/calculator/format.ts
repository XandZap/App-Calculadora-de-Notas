import { PLACEHOLDER } from "./constants";
import type { CalculatorHint } from "@/types/calculator";

export function formatGrade(value: number | null): string {
  if (value === null || value === undefined) return PLACEHOLDER;
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

/** Formata hint de nota necessária */
export function formatHint(value: number | null): string {
  if (value === null) return PLACEHOLDER;
  // Se o valor for 0, mostra "qualquer nota"
  if (value <= 0) return "qualquer nota";
  return `≥ ${value.toFixed(1)}`;
}

export function formatHintBlock(direct: number | null, n3Access: number | null): string {
  const dir = formatHint(direct);
  const acc = formatHint(n3Access);
  return `Para passar direto: N2 ${dir}. Para garantir acesso à N3: N2 ${acc}.`;
}

export function formatHintBlockInstitutional(direct: number | null, n3Access: number | null): string {
  const dir = formatHint(direct);
  const acc = formatHint(n3Access);
  return `Passar direto: Institucional ${dir} · Acessar N3: ${acc} na Institucional basta.`;
}

export function formatHintBlockPartial(direct: number | null, n3Access: number | null): string {
  const dir = formatHint(direct);
  const acc = formatHint(n3Access);
  return `Passar direto: Parcial ${dir} · Acessar N3: ${acc} na Parcial basta.`;
}
