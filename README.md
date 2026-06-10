# Calculadora de Aprovação — FAMETRO

Calculadora acadêmica para simular médias parciais e finais com base no sistema de avaliação da FAMETRO.

## Funcionalidades

- **Seletor de Período**: escolha entre "1º e 2º Período" ou "3º ao 8º Período" para adequar as regras de cálculo
- **Avaliação de Campo (N2)**: opção disponível para períodos a partir do 3º
- **Cálculo das Notas**:
  - **N1**: no 1º e 2º período, é calculada como (Parcial + Institucional) ÷ 2; nos demais, apenas a nota institucional
  - **N2**: sempre calculada como (Parcial + Institucional) ÷ 2, com opção de incluir avaliação de campo
  - **N3**: prova final habilitada quando a média parcial fica entre 4,0 e 6,0
- **Resumo em tempo real**: exibe N1, N2, média parcial e status de aprovação
- **Botão Limpar**: reseta todos os campos para recomeçar

## Regras de Aprovação

| Situação | Resultado |
|----------|-----------|
| Média Parcial ≥ 6,0 | Aprovado direto ✅ |
| Média Parcial < 4,0 | Reprovado direto ❌ |
| 4,0 ≤ Média Parcial < 6,0 | Prova Final (N3) necessária |
| Média Final ≥ 5,0 | Aprovado após N3 ✅ |
| Média Final < 5,0 | Reprovado após N3 ❌ |

## Fórmulas

- N2 = (Parcial + Institucional) ÷ 2
- Média Parcial = (N1 + N2) ÷ 2
- Média Final = (Média Parcial + N3) ÷ 2

## Autoria

Desenvolvido por Gabriel Frantz
