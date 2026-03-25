# Template Method para Exportação de Relatorio

## Contexto

Diferentes exportadores de relatório seguem o mesmo fluxo geral: preparar dados, formatar conteúdo e salvar arquivo, mudando apenas o formato final.

## Solução

Uma classe abstrata define o algoritmo de exportação. Cada exportador concreto implementa somente a etapa de formatação específica.

## Impacto arquitetural

- Reaproveita o fluxo fixo de exportação.
- Mantem cada variação concentrada na subclasse correta.
- Usa herança, o que pode limitar flexibilidade em cenarios mais dinâmicos.

## Executar

```bash
npm install
npm start
```
