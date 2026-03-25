# Observer para Alerta de Estoque

## Contexto

Quando um produto volta ao estoque, diferentes partes do sistema podem precisar reagir, como notificação para cliente e atualização de dashboard.

## Solução

O produto observado notifica todos os observers registrados quando a quantidade muda. Cada observer reage de forma independente.

## Impacto arquitetural

- Desacopla o produto das reações disparadas por mudança de estoque.
- Facilita adicionar novos interessados sem alterar o subject.
- Exige cuidado com quantidade de observers e ordem de notificação.

## Executar

```bash
npm install
npm start
```
