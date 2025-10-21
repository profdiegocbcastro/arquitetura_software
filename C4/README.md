# Configuração do Ambiente PlantUML e C4

Este guia ensina como configurar o ambiente necessário para usar o **PlantUML** no **VSCode** e trabalhar com diagramas do **C4 Model**.

## Links úteis

- [C4 Model](https://c4model.com) – Guia oficial do modelo C4.
- [C4-PlantUML](https://github.com/plantuml-stdlib/C4-PlantUML) – Biblioteca PlantUML para criar diagramas C4.

## Requisitos

1. **Java**
   O PlantUML depende do Java para funcionar.
   [Download do Java](https://www.java.com/pt-BR/download/)

2. **PlantUML no VSCode**
   - Abra o VSCode.
   - Vá em **Extensões** e instale a extensão **PlantUML**.
   - Permite visualizar e gerar diagramas diretamente no VSCode.

3. **Graphviz**
   O PlantUML usa o Graphviz para gerar gráficos.
   No Linux (Ubuntu/Debian), instale com:

   ```bash
   sudo apt install graphviz


## Incluindo os elementos

- !include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/refs/heads/master/C4_Context.puml
- !include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/refs/heads/master/C4_Container.puml
- !include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/refs/heads/master/C4_Component.puml
