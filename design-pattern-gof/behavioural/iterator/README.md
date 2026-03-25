# Iterator

Esta pasta contém dois exemplos práticos do padrão Iterator.

## Exemplos

- `music-playlist`: percorre uma playlist de músicas sem expor diretamente o array interno.
- `product-catalog-pagination`: percorre um catálogo em páginas iteráveis para exibição em tela.

## Componentes do padrão

- `Iterator`: contrato comum de navegação sobre a coleção.
- `ConcreteIterator`: implementação que conhece a forma de percorrer os elementos.
- `Aggregate`: coleção que cria o iterador apropriado.
- `Client`: classe que consome o iterador sem depender da estrutura interna do agregado.

## Como os componentes se comunicam

O cliente pede ao `Aggregate` um iterador concreto.

Esse iterador mantém o estado da navegação e expõe operações como `hasNext()` e `next()`, escondendo detalhes da estrutura real da coleção.

Com isso, a forma de percorrer os dados fica desacoplada da estrutura armazenada pelo agregado.

## Diagrama PlantUML

O diagrama deste padrão está em [iterator.puml](./iterator.puml).

## Ideia arquitetural

O Iterator é útil quando a aplicação precisa navegar por coleções de modo uniforme, com baixo acoplamento à estrutura interna e possibilidade de múltiplas estratégias de percurso.

Ele fica ainda mais interessante quando a coleção não deve expor diretamente sua implementação ou quando diferentes clientes percorrem o mesmo conjunto de formas distintas.
