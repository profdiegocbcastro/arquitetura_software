# Prototype para Templates de Relatórios

## Contexto

Uma área de BI gera vários relatórios com a mesma estrutura visual e os mesmos blocos padrão, alterando apenas período, título, indicadores e observações específicas. Recriar essa base a cada novo relatório aumenta repetição e risco de inconsistência.

## Solução

O Prototype usa um template-base de relatório já configurado e cria clones para cada novo relatório, ajustando apenas os campos necessários.

## Impacto arquitetural

- Reduz repetição na criação de relatórios semelhantes.
- Mantém consistência estrutural entre relatórios derivados do mesmo template.
- Exige cuidado para clonar corretamente arrays e objetos internos.

## Executar

```bash
npm install
npm start
```
