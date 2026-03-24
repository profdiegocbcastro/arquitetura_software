# Composite para Sistema de Arquivos

## Contexto

Um sistema precisa representar arquivos e pastas em uma mesma árvore, permitindo listar conteúdo e calcular tamanho total sem espalhar condicionais pela aplicação.

## Solução

O Composite trata arquivos e pastas pelo mesmo contrato. Arquivos funcionam como folhas e pastas funcionam como composições que agregam outros elementos.

## Impacto arquitetural

- Simplifica o tratamento uniforme de nós individuais e agrupados.
- Facilita operações recursivas sobre a árvore de arquivos.
- Pode tornar o contrato mais genérico do que o ideal para algumas folhas simples.

## Executar

```bash
npm install
npm start
```
