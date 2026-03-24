# Flyweight para Renderização de Floresta

## Contexto

Um jogo precisa renderizar muitas árvores em um mapa grande. Embora existam milhares de árvores, muitas compartilham a mesma espécie, textura e cor base.

## Solução

O Flyweight reutiliza tipos de árvore compartilhados e mantém fora deles apenas o contexto variável, como posição e escala de cada árvore no cenário.

## Impacto arquitetural

- Reduz duplicação de dados repetidos entre árvores semelhantes.
- Melhora viabilidade de cenários com grande quantidade de objetos visuais.
- Exige separar com clareza o que pertence ao tipo da árvore e o que pertence à instância posicionada no mundo.

## Executar

```bash
npm install
npm start
```
