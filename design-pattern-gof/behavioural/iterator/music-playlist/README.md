# Iterator para Playlist de Musicas

## Contexto

Uma playlist precisa ser percorrida por um player sem expor diretamente sua estrutura interna de armazenamento.

## Solução

O Aggregate cria um iterador concreto que controla a navegação da playlist. O player percorre as músicas usando apenas o contrato do iterator.

## Impacto arquitetural

- Desacopla o player da estrutura interna da playlist.
- Permite trocar a estratégia de percurso no futuro.
- Adiciona uma camada extra para coleções muito simples.

## Executar

```bash
npm install
npm start
```
