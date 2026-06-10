import type { PeriodType, FieldEvalType } from "@/types/calculator";

export const PERIOD_OPTIONS: {
  value: PeriodType;
  label: string;
  subtitle: string;
}[] = [
  {
    value: "1-2",
    label: "1º e 2º Período",
    subtitle: "N1 e N2 têm prova parcial",
  },
  {
    value: "3-8",
    label: "3º ao 8º Período",
    subtitle: "Parcial apenas na N2",
  },
];

export const FIELD_EVAL_OPTIONS: {
  value: FieldEvalType;
  label: string;
  subtitle: string;
}[] = [
  {
    value: "none",
    label: "Sem Avaliação de Campo",
    subtitle: "N2 Institucional vale até 10",
  },
  {
    value: "with-field",
    label: "Com Avaliação de Campo",
    subtitle: "N2 Inst. vale até 9 + campo (1 pt)",
  },
];

export const INPUT_LIMITS = {
  N1_PARTIAL: { min: 0, max: 10, step: 0.1 },
  N1_INSTITUTIONAL: { min: 0, max: 10, step: 0.1 },
  N2_PARTIAL: { min: 0, max: 10, step: 0.1 },
  N2_INSTITUTIONAL_DEFAULT: { min: 0, max: 10, step: 0.1 },
  N2_INSTITUTIONAL_FIELD: { min: 0, max: 9, step: 0.1 },
  N2_FIELD_SCORE: { min: 0, max: 1, step: 0.1 },
  N3_FINAL: { min: 0, max: 10, step: 0.1 },
} as const;

export const APPROVAL_THRESHOLDS = {
  DIRECT_APPROVAL: 6.0,
  DIRECT_FAILURE: 4.0,
  FINAL_APPROVAL: 5.0,
} as const;

export const STATUS_LABELS: Record<string, string> = {
  idle: "—",
  approved_direct: "Aprovado Direto! ✅",
  failed_direct: "Reprovado Direto ❌",
  needs_n3: "Prova Final (N3) necessária",
  approved_after_n3: "Aprovado após N3! ✅",
  failed_after_n3: "Reprovado após N3 ❌",
};

export const PLACEHOLDER = "—";
