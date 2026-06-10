import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade — Calculadora de Aprovação FAMETRO",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-[600px] mx-auto px-5 py-10 text-[#7a98b8] font-sans text-sm leading-relaxed">
      <h1 className="text-[#e2e8f0] text-xl font-semibold mb-4">Política de Privacidade</h1>
      <p className="mb-3">
        Esta Calculadora de Aprovação não coleta, armazena ou compartilha quaisquer dados pessoais dos usuários.
        Todas as notas inseridas são processadas exclusivamente no navegador e não são enviadas a nenhum servidor.
      </p>
      <h2 className="text-[#e2e8f0] text-base font-semibold mt-6 mb-2">Anúncios</h2>
      <p className="mb-3">
        Este site exibe anúncios do Google AdSense. O Google pode utilizar cookies para exibir anúncios
        personalizados com base nas visitas do usuário a outros sites. Você pode desativar a personalização de
        anúncios nas configurações da sua conta Google.
      </p>
      <h2 className="text-[#e2e8f0] text-base font-semibold mt-6 mb-2">Cookies</h2>
      <p className="mb-3">
        Cookies de terceiros (como os do Google AdSense) podem ser utilizados para fins de publicidade. Nós não
        utilizamos cookies próprios para rastreamento.
      </p>
      <h2 className="text-[#e2e8f0] text-base font-semibold mt-6 mb-2">Contato</h2>
      <p className="mb-3">Em caso de dúvidas, entre em contato pelo e-mail do desenvolvedor.</p>
      <p className="mt-6 text-[10px] text-[#4d6a88]">Última atualização: Junho de 2026.</p>
    </main>
  );
}

