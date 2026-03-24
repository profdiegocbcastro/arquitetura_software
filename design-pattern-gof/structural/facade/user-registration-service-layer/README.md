# Facade para Cadastro de Usuário

## Contexto

Um back-end precisa cadastrar usuários executando várias etapas internas, como validação, verificação de duplicidade, hash de senha, persistência, envio de boas-vindas e auditoria.

## Solução

O Facade concentra esse fluxo em uma camada de serviço única, permitindo que o cliente invoque o cadastro sem conhecer a coordenação dos subsistemas.

## Impacto arquitetural

- Reduz acoplamento da camada cliente com detalhes do cadastro.
- Centraliza a orquestração do caso de uso em um ponto único.
- Pode virar um serviço excessivamente grande se acumular responsabilidades demais.

## Executar

```bash
npm install
npm start
```
