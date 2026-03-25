# Observer para Estação Meteorológica

## Contexto

Uma estação meteorológica publica novas leituras de clima e diferentes telas precisam reagir automaticamente a cada atualização.

## Solução

As telas se registram como observers da estação. Quando os dados mudam, a estação notifica todos os inscritos.

## Impacto arquitetural

- Facilita adicionar novas telas sem alterar a estação.
- Remove acoplamento direto entre fonte de dados e consumidores.
- Pode dificultar rastreamento quando muitas notificações são disparadas.

## Executar

```bash
npm install
npm start
```
