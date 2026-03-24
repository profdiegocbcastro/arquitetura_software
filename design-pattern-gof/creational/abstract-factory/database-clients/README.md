# Abstract Factory para Clientes de Banco de Dados

## Contexto

Uma plataforma analítica precisa operar com PostgreSQL, MySQL e MongoDB em ambientes diferentes. Não basta trocar apenas a conexão: também é necessário trocar os repositórios e comandos para manter compatibilidade com a tecnologia escolhida.

## Solução

O Abstract Factory encapsula a criação de famílias compatíveis de produtos. Cada fábrica concreta cria uma conexão e um repositório alinhados ao mesmo banco de dados.

## Impacto arquitetural

- Reduz acoplamento entre serviços de negócio e tecnologia de persistência.
- Garante consistência entre conexão e repositório criados para o mesmo banco.
- Aumenta o número de abstrações e exige boa organização para manter clareza.

## Executar

```bash
npm install
npm start
```
