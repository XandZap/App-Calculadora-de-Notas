"use client";

import { useState } from "react";
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
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div
        className="flex items-center justify-between cursor-pointer select-none mb-3"
        onClick={() => setExpanded((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setExpanded((prev) => !prev);
          }
        }}
      >
        <p className="font-sans text-[10.5px] font-bold text-[#4d6a88] uppercase tracking-[0.12em] m-0">
          Fórmulas
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="currentColor"
          viewBox="0 0 256 256"
          className={`text-[#4d6a88] transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80a8,8,0,0,1,11.32-11.32L128,165l74.34-74.34a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </div>

      {expanded && (
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
      )}
    </div>
  );
}
