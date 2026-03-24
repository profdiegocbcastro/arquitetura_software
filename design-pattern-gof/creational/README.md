# Padrões Criacionais

Esta pasta reúne os padrões criacionais do GoF, cujo foco principal é organizar a criação de objetos e reduzir o acoplamento entre a regra de negócio e as classes concretas instanciadas.

## Padrões desta categoria

- [Singleton](./singleton/README.md): garante um único ponto de acesso para uma instância compartilhada.
- [Factory Method](./factory-method/README.md): delega a criação de um produto para subclasses ou creators concretos.
- [Abstract Factory](./abstract-factory/README.md): cria famílias de objetos relacionados e compatíveis entre si.
- [Builder](./builder/README.md): separa a construção de objetos complexos de sua representação final.
- [Prototype](./prototype/README.md): cria novos objetos a partir da clonagem de protótipos existentes.

## Quando é interessante usar cada padrão

### Singleton

Use quando a aplicação precisa compartilhar um recurso centralizado, caro ou sensível, como pool de conexões, cache, logger ou configuração global.

Ele é interessante quando faz sentido existir um único ponto de acesso controlado para esse recurso. Em contrapartida, não é uma boa escolha quando o padrão começa a servir apenas como atalho para estado global, porque isso aumenta acoplamento e dificulta testes.

### Factory Method

Use quando o fluxo principal da aplicação é estável, mas o tipo concreto do objeto criado pode variar, como canais de notificação, meios de pagamento ou exportadores de arquivo.

Ele é interessante quando você quer remover condicionais espalhadas do serviço principal e concentrar a criação em creators específicos. Perde valor quando a variação é mínima e a abstração adiciona mais classes do que benefício.

### Abstract Factory

Use quando a aplicação precisa trocar famílias inteiras de objetos relacionados, mantendo compatibilidade entre eles, como conexão + repositório de banco ou processador de pagamento + processador de reembolso.

Ele é interessante quando não basta variar apenas um objeto isolado, mas um conjunto coerente de componentes. Em cenários simples, pode ser abstração demais.

### Builder

Use quando o objeto final é complexo, tem muitos parâmetros opcionais ou precisa ser montado em etapas, como requests HTTP, DTOs grandes, configurações ou objetos imutáveis.

Ele é interessante para melhorar legibilidade e evitar construtores longos ou telescópicos. Em objetos simples, normalmente é excesso de cerimônia.

### Prototype

Use quando criar um objeto do zero é caro, repetitivo ou depende de uma configuração base que pode ser copiada e ajustada.

Ele é interessante quando a clonagem preserva uma estrutura previamente preparada, como templates, presets, documentos base ou objetos ricos em configuração. Deve ser usado com cuidado quando existem referências internas complexas, porque cópia rasa e cópia profunda podem gerar erros sutis.

## Onde esses padrões aparecem nativamente na prática

### Singleton

Um caso muito comum aparece no Spring Framework: o escopo `singleton` é o padrão para beans gerenciados pelo container. Na prática, o Spring cria uma instância compartilhada por bean definido no container e a reutiliza nas injeções de dependência.

Referência oficial:
- Spring Framework, `Bean Scopes`: https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html

### Factory Method

Na prática, a ideia de Factory Method aparece com frequência em APIs do JDK que encapsulam a criação por meio de métodos como `Calendar.getInstance()` e `NumberFormat.getInstance()`. Embora isso nem sempre represente a forma clássica do GoF por herança, é um uso nativo da ideia de esconder a criação concreta atrás de um método de fábrica.

Referências oficiais:
- Oracle JDK, `Calendar.getInstance()`: https://docs.oracle.com/javase/9/docs/api/java/util/Calendar.html
- Oracle JDK, `NumberFormat.getInstance()`: https://docs.oracle.com/javase/8/docs/api/java/text/NumberFormat.html

### Abstract Factory

Um exemplo muito claro aparece no ADO.NET com `DbProviderFactory`. A fábrica permite criar objetos compatíveis de uma mesma família, como `DbConnection`, `DbCommand` e outros componentes, de acordo com o provedor configurado.

Referências oficiais:
- Microsoft Learn, `DbProviderFactories`: https://learn.microsoft.com/pt-br/dotnet/framework/data/adonet/dbproviderfactories
- Microsoft Learn, `Obtendo um DbProviderFactory`: https://learn.microsoft.com/pt-br/dotnet/framework/data/adonet/obtaining-a-dbproviderfactory

### Builder

O padrão Builder aparece explicitamente na API HTTP do Java. `HttpRequest.newBuilder()` cria um builder que permite configurar o request em etapas antes de gerar o objeto final imutável.

Referência oficial:
- Oracle JDK, `HttpRequest.Builder`: https://docs.oracle.com/en/java/javase/11/docs/api/java.net.http/java/net/http/HttpRequest.Builder.html

### Prototype

O exemplo mais nativo está no próprio JavaScript, cuja base de objetos é prototipal. O método `Object.create()` permite criar um novo objeto a partir de um protótipo existente, o que se alinha diretamente com a ideia do padrão Prototype.

Referências oficiais:
- MDN, `Object.create()`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
- MDN, `Inheritance and the prototype chain`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain

## Leitura arquitetural

Os padrões criacionais são mais úteis quando a complexidade da criação começa a afetar a legibilidade, a testabilidade e a extensibilidade da aplicação.

Em geral:

- `Singleton` controla compartilhamento.
- `Factory Method` varia um produto.
- `Abstract Factory` varia uma família de produtos.
- `Builder` organiza a montagem de um objeto complexo.
- `Prototype` reaproveita uma estrutura já existente por clonagem.

Escolher o padrão certo depende menos do nome do problema e mais da estrutura da variação que precisa ser controlada.
