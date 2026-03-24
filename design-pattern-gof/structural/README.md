# Padrões Estruturais

Esta pasta reúne os padrões estruturais do GoF, cujo foco principal é organizar a composição entre classes e objetos para reduzir acoplamento, melhorar extensibilidade e permitir estruturas mais flexíveis.

## Padrões desta categoria

- [Adapter](./adapter/README.md): adapta uma interface incompatível para o contrato esperado pelo sistema.
- [Bridge](./bridge/README.md): separa abstração e implementação em hierarquias independentes.
- [Composite](./composite/README.md): trata objetos simples e compostos por meio do mesmo contrato.
- [Decorator](./decorator/README.md): adiciona responsabilidades a um objeto por composição.
- [Facade](./facade/README.md): oferece uma interface simplificada para vários subsistemas.
- [Flyweight](./flyweight/README.md): compartilha estado comum entre muitos objetos semelhantes.
- [Proxy](./proxy/README.md): controla o acesso a um objeto real sem alterar o contrato do cliente.

## Quando é interessante usar cada padrão

### Adapter

Use quando a aplicação precisa integrar uma classe, SDK, API externa ou modelo legado cuja interface não combina com o contrato esperado internamente.

Ele é interessante quando você quer preservar a interface do sistema cliente e concentrar a tradução em uma camada específica, em vez de espalhar conversões pelo código.

### Bridge

Use quando existem duas dimensões de variação independentes no mesmo problema, como tipo e formato, ou domínio e tecnologia, e ambas precisam evoluir sem gerar subclasses combinatórias.

Ele é interessante quando a solução por herança começa a produzir uma matriz de classes, porque separa essas dimensões em duas hierarquias compostas entre si.

### Composite

Use quando o domínio possui uma estrutura hierárquica em árvore e o sistema precisa tratar elementos simples e agrupamentos pelo mesmo contrato.

Ele é interessante em cenários como arquivos e pastas, menus, permissões, componentes visuais e estruturas organizacionais.

### Decorator

Use quando o sistema precisa adicionar responsabilidades a um objeto de forma flexível, combinável e em tempo de execução, sem multiplicar subclasses.

Ele é interessante quando diferentes comportamentos podem ser empilhados, como logging, compressão, autenticação, notificações ou regras de preço.

### Facade

Use quando vários subsistemas precisam ser coordenados para cumprir um caso de uso, mas a camada cliente não deveria conhecer essa orquestração detalhada.

Ele é interessante quando a complexidade operacional está alta e você quer expor uma entrada mais simples e estável para outras partes do sistema.

### Flyweight

Use quando o sistema manipula um volume muito grande de objetos parecidos e parte relevante do estado pode ser compartilhada.

Ele é interessante em renderização, jogos, catálogos massivos, processamento de sensores e cenários em que duplicação de dados passa a custar memória de forma sensível.

### Proxy

Use quando o sistema precisa controlar o acesso a um objeto sem mudar o contrato consumido pelo cliente, por exemplo para lazy loading, cache, segurança, acesso remoto ou observabilidade.

Ele é interessante quando a política de acesso não deve ficar misturada com a responsabilidade principal do objeto real.

## Onde esses padrões aparecem nativamente na prática

### Adapter

Um exemplo explícito aparece no Spring MVC com `HandlerAdapter`. A própria documentação descreve a interface como uma forma de integrar handlers de outros frameworks sem exigir código customizado no fluxo principal do dispatcher.

Referência oficial:
- Spring Framework, `HandlerAdapter`: https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/servlet/HandlerAdapter.html

### Bridge

Um exemplo prático pode ser entendido na arquitetura do JDBC. A API `java.sql` define a interface usada pela aplicação, enquanto diferentes drivers implementam o acesso concreto a diferentes bancos. Essa leitura é uma inferência arquitetural a partir da separação entre API e drivers descrita na documentação oficial.

Referências oficiais:
- Oracle Java, pacote `java.sql`: https://docs.oracle.com/en/java/javase/11/docs/api/java.sql/java/sql/package-summary.html
- Oracle Database, visão geral de JDBC drivers: https://docs.oracle.com/en/database/oracle/oracle-database/18/tdpjd/using-java-with-oracle-database.html

### Composite

Um exemplo clássico aparece em `java.awt`, onde `Container` herda de `Component` e pode conter outros componentes. Isso cria uma estrutura hierárquica tratada de forma uniforme pela API gráfica.

Referências oficiais:
- Oracle Java, `Container`: https://docs.oracle.com/en/java/javase/12/docs/api/java.desktop/java/awt/Container.html
- Oracle Java, `Component`: https://docs.oracle.com/en/java/javase/12/docs/api/java.desktop/java/awt/Component.html

### Decorator

O exemplo mais clássico está em `java.io.FilterInputStream`, que encapsula outro `InputStream` e adiciona comportamento por meio de subclasses como `BufferedInputStream`, `DataInputStream` e outras.

Referência oficial:
- Oracle Java, `FilterInputStream`: https://docs.oracle.com/javase/7/docs/api/java/io/FilterInputStream.html

### Facade

Um exemplo explícito é o SLF4J, cujo próprio nome significa `Simple Logging Facade for Java`. Ele oferece uma interface única para trabalhar com diferentes implementações de logging.

Referência oficial:
- SLF4J Manual: https://www.slf4j.org/manual.html

### Flyweight

Um exemplo muito conhecido está em `Integer.valueOf(int)`, cuja documentação destaca melhor desempenho por meio do cache de valores frequentemente solicitados. Isso é um uso nativo da ideia de compartilhamento de instâncias.

Referência oficial:
- Oracle Java, `Integer.valueOf(int)`: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Integer.html

### Proxy

O exemplo mais direto está em `java.lang.reflect.Proxy`, que permite criar proxies dinâmicos em Java mantendo o mesmo contrato das interfaces implementadas.

Referência oficial:
- Oracle Java, `Proxy`: https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Proxy.html

## Leitura arquitetural

Os padrões estruturais são mais úteis quando o problema deixa de ser “como criar objetos” e passa a ser “como conectar objetos, contratos e responsabilidades sem deixar o desenho rígido demais”.

Em geral:

- `Adapter` compatibiliza interfaces.
- `Bridge` separa dimensões independentes de variação.
- `Composite` organiza estruturas hierárquicas.
- `Decorator` empilha comportamentos.
- `Facade` simplifica fluxos compostos.
- `Flyweight` compartilha estado repetido.
- `Proxy` controla acesso.

Escolher o padrão correto depende de entender qual é o problema estrutural dominante: incompatibilidade, explosão de subclasses, hierarquia, enriquecimento incremental, simplificação de subsistemas, economia de memória ou controle de acesso.
