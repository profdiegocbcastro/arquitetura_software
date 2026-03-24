# Adapter para DTO Mapper

## Contexto

Uma API moderna precisa responder com um DTO padronizado, mas os dados disponíveis chegam em um formato legado com nomes de campos e convenções incompatíveis com o contrato atual.

## Solução

O Adapter atua como um mapper que traduz o payload legado para o DTO esperado pela camada de apresentação.

## Impacto arquitetural

- Centraliza a tradução entre contrato legado e contrato moderno.
- Evita espalhar mapeamentos manuais pela aplicação.
- Pode acumular complexidade quando múltiplas versões de payload coexistem por muito tempo.

## Executar

```bash
npm install
npm start
```
