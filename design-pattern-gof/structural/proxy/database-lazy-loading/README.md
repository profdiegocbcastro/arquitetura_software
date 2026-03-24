# Proxy para Lazy Loading de Banco de Dados

## Contexto

Uma aplicação precisa expor acesso a consultas de banco, mas a conexão real é cara e não deve ser aberta antes da primeira operação efetiva.

## Solução

O Proxy implementa o mesmo contrato da conexão real e só cria a conexão concreta no momento em que a primeira consulta é executada.

## Impacto arquitetural

- Reduz custo de inicialização quando a conexão pode não ser usada.
- Mantém o cliente desacoplado da estratégia de carregamento tardio.
- Exige cuidado para não esconder latência inesperada na primeira chamada.

## Executar

```bash
npm install
npm start
```
