# Facade para Geração de Relatórios

## Contexto

Um sistema corporativo precisa gerar um relatório usando várias etapas internas, como coleta de dados, análise, montagem do conteúdo, exportação e envio ao destinatário final.

## Solução

O Facade encapsula a pipeline inteira em uma interface única de geração de relatório, escondendo a sequência e os detalhes dos subsistemas envolvidos.

## Impacto arquitetural

- Simplifica o consumo de uma pipeline complexa por outras camadas.
- Centraliza a coordenação das etapas em um único ponto de entrada.
- Pode concentrar complexidade demais se a facade tentar assumir lógica que pertence aos subsistemas.

## Executar

```bash
npm install
npm start
```
