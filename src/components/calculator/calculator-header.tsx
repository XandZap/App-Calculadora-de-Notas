"use client";

interface CalculatorHeaderProps {
  onClear: () => void;
}

export function CalculatorHeader({ onClear }: CalculatorHeaderProps) {
  return (
    <header
      className="w-full px-4 sm:px-5 lg:px-8 pt-7 sm:pt-9 pb-6 sm:pb-8"
      style={{
        background: "linear-gradient(160deg, #0c1829 0%, #080d1a 100%)",
        borderBottom: "1px solid rgb(30, 45, 69)",
      }}
    >
      <div className="w-full flex justify-between items-start">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <img
              src="/favicon.ico"
              alt="FAMETRO"
              className="w-5 h-5 rounded-sm shrink-0"
            />
            <p className="font-sans text-[10px] font-bold text-[#14b8a6] tracking-[0.2em] uppercase m-0">
              FAMETRO · SISTEMA DE NOTAS
            </p>
          </div>
          <h1
            className="mt-2 mb-1 text-[#e2e8f0] leading-[1.1]"
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: "clamp(24px, 5vw, 36px)",
              fontWeight: 400,
            }}
          >
            Calculadora<br />
            de Aprovação
          </h1>
          <p className="mt-2 text-[12px] text-[#7a98b8] font-sans">
            Preencha as notas já obtidas
          </p>
        </div>
        <button
          onClick={onClear}
          className="shrink-0 ml-4 sm:ml-6 mt-1 bg-none border border-[#1e2d45] rounded-[8px] px-3 sm:px-4 py-2 text-[#4d6a88] text-[12px] font-sans cursor-pointer transition-all duration-200 hover:border-[#3a5a7a] hover:text-[#7a98b8]"
        >
          Limpar
        </button>
      </div>
    </header>
  );
}
