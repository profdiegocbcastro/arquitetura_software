# Visitor para Auditoria de Documentos

## Contexto

Um sistema possui documentos de tipos diferentes e precisa aplicar auditoria sem espalhar a lógica de verificação dentro das classes de documento.

## Solução

Cada documento aceita um visitor de auditoria. O visitor executa a verificação adequada para cada tipo concreto.

## Impacto arquitetural

- Centraliza a operação de auditoria fora dos documentos.
- Facilita adicionar novas operações sobre a estrutura.
- Demanda atualização do visitor sempre que surgir um novo tipo de documento.

## Executar

```bash
npm install
npm start
```
