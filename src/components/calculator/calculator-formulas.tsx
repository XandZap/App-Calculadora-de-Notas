import { SectionCard } from "./ui/section-card";

const formulas = [
  "N2 = (Parcial + Institucional) ÷ 2",
  "Média Parcial = (N1 + N2) ÷ 2",
  "Média Parcial ≥ 6.0 → Aprovado direto",
  "Média Parcial < 4.0 → Reprovado direto",
  "4.0 ≤ Média Parcial < 6.0 → Prova Final (N3)",
  "Média Final = (Média Parcial + N3) ÷ 2",
  "Média Final ≥ 5.0 → Aprovado",
];

export function CalculatorFormulas() {
  return (
    <div>
      <p className="font-sans text-[10.5px] font-bold text-[#4d6a88] uppercase tracking-[0.12em] mb-3">
        Fórmulas
      </p>
      <SectionCard>
        <div className="flex flex-col gap-2.5">
          {formulas.map((formula, index) => (
            <p
              key={index}
              className="font-mono text-[11.5px] text-[#7a98b8] leading-relaxed"
            >
              {formula}
            </p>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
