# Proxy para Cache de Produtos

## Contexto

Um catálogo consulta produtos repetidamente no banco de dados, mas muitas leituras se repetem com a mesma chave, desperdiçando chamadas ao repositório real.

## Solução

O Proxy intercepta as leituras de produto, consulta um cache em memória e só delega ao repositório real quando a informação ainda não está armazenada.

## Impacto arquitetural

- Reduz leituras repetidas no banco de dados.
- Mantém a política de cache fora do repositório real.
- Exige cuidado com invalidação e consistência dos dados em cenários reais.

## Executar

```bash
npm install
npm start
```
