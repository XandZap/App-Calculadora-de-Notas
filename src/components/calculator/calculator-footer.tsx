import Link from "next/link";

export function CalculatorFooter() {
  return (
    <div className="text-center py-8">
      <p className="font-sans text-[12px] text-[#7a98b8]">
        Feito por{" "}
        <span className="text-[#e2e8f0] font-semibold">Gabriel Frantz</span>
      </p>
      <Link
        href="/privacy-policy"
        className="inline-block mt-2 font-sans text-[10px] text-[#4d6a88] hover:text-[#7a98b8] transition-colors duration-200 underline underline-offset-2"
      >
        Política de Privacidade
      </Link>
    </div>
  );
}
