# Flyweight

Esta pasta contém dois exemplos práticos do padrão Flyweight.

## Exemplos

- `forest-rendering`: reutiliza tipos de árvore em um jogo que precisa renderizar muitas árvores iguais.
- `sensor-histogram-processing`: reutiliza faixas de valor de sensores e processa médias por histograma, sem armazenar todas as leituras individualmente.

## Componentes do padrão

- `Flyweight`: objeto compartilhado que concentra o estado intrínseco reutilizável.
- `ConcreteFlyweight`: implementação concreta do objeto compartilhado.
- `FlyweightFactory`: responsável por criar e reutilizar flyweights existentes.
- `Context`: estado extrínseco que varia por uso e fica fora do flyweight.
- `Client`: parte da aplicação que combina flyweights com contextos específicos.

## Como os componentes se comunicam

O cliente solicita um flyweight à fábrica usando uma chave que representa o estado intrínseco compartilhável.

Se o flyweight já existir, a fábrica devolve a mesma instância. Se não existir, cria uma nova e passa a reutilizá-la nas próximas chamadas.

O estado que muda por ocorrência, como posição de uma árvore ou quantidade de leituras em um bucket, permanece fora do flyweight e é fornecido como contexto no momento do uso.

## Diagrama PlantUML

O diagrama deste padrão está em [flyweight.puml](./flyweight.puml).

## Ideia arquitetural

O Flyweight é útil quando o sistema precisa lidar com um volume muito grande de objetos parecidos e percebe que boa parte do estado desses objetos é repetida.

Sem esse padrão, a aplicação tende a criar milhares ou milhões de instâncias contendo os mesmos dados duplicados em memória. O problema normalmente aparece em motores de jogo, renderização, catálogos enormes, editores, sensores e processamento massivo de eventos.

O ganho arquitetural está em separar o estado em duas partes:

- estado intrínseco: compartilhável, estável e igual entre muitas ocorrências
- estado extrínseco: específico de cada uso e fornecido externamente

Quando essa separação faz sentido, o sistema reduz consumo de memória, melhora reutilização e torna o processamento em grande escala mais viável.

O padrão exige cuidado porque nem todo dado repetido deve virar flyweight. Se a separação entre estado compartilhado e estado contextual ficar artificial, o código pode ficar mais difícil de entender do que o benefício justifica.
