# Iterator para Catalogo Paginado

## Contexto

Uma tela de catálogo precisa mostrar produtos em páginas, mas a camada cliente não deveria conhecer a lógica de páginação da coleção.

## Solução

O catálogo cria um iterador de páginas. A tela consome esse iterator e exibe os blocos de produtos sem depender de cálculos manuais de índice.

## Impacto arquitetural

- Centraliza a lógica de páginação no iterador.
- Mantem a tela desacoplada da estrutura da coleção.
- Pode ser excessivo quando a navegação e extremamente simples.

## Executar

```bash
npm install
npm start
```
