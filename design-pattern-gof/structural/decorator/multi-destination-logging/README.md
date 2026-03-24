# Decorator para Logging em Múltiplos Destinos

## Contexto

Uma aplicação precisa registrar eventos no console, em arquivo e em banco de dados, mas quer manter o mesmo contrato de logging sem misturar todos os destinos dentro de uma única classe monolítica.

## Solução

O Decorator encadeia destinos de log sobre um logger base, permitindo compor o pipeline de persistência conforme o ambiente ou a necessidade operacional.

## Impacto arquitetural

- Permite combinar destinos sem criar implementações rígidas para cada cenário.
- Mantém cada destino de logging isolado em sua própria camada.
- Pode dificultar observabilidade do fluxo se houver muitas camadas encadeadas.

## Executar

```bash
npm install
npm start
```
