# Chain of Responsibility para Validação de Formulário

## Contexto

Um formulário de cadastro precisa verificar campos obrigatórios, formato de e-mail, força mínima da senha e aceite dos termos. Se toda a validação ficar concentrada em um único serviço, o fluxo cresce rapidamente e fica mais difícil de manter.

## Solução

O Chain of Responsibility organiza cada regra de validação em um handler independente. O serviço de submissão dispara a cadeia e recebe o primeiro erro encontrado ou a confirmação de sucesso.

## Impacto arquitetural

- Mantém cada regra de validação isolada em uma etapa própria.
- Facilita inclusão, remoção ou reordenação de validações.
- Exige atenção para deixar a ordem da cadeia explícita.

## Executar

```bash
npm install
npm start
```
