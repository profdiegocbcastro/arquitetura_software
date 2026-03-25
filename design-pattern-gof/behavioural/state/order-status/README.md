# State para Status de Pedido

## Contexto

Um pedido muda de comportamento conforme o estado atual: antes do pagamento, depois do pagamento, apos envio ou apos cancelamento.

## Solução

Cada fase do pedido vira uma classe de estado. O pedido delega operações ao estado atual, que decide o comportamento permitido e as transições válidas.

## Impacto arquitetural

- Remove condicionais espalhadas por status.
- Deixa transições e restrições mais explícitas.
- Aumenta o numero de classes para representar o ciclo de vida.

## Executar

```bash
npm install
npm start
```
