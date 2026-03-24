# Composite

Esta pasta contém dois exemplos práticos do padrão Composite.

## Exemplos

- `file-system`: modela arquivos e pastas em uma estrutura hierárquica tratada pelo mesmo contrato.
- `role-permissions`: modela permissões e papéis compostos, permitindo que uma role contenha outras roles.

## Componentes do padrão

- `Component`: contrato comum compartilhado por objetos simples e compostos.
- `Leaf`: elemento indivisível da estrutura, como um arquivo ou uma permissão simples.
- `Composite`: elemento que contém outros componentes e delega operações recursivamente.
- `Client`: parte da aplicação que navega na árvore sem precisar distinguir fortemente folhas e composições.

## Como os componentes se comunicam

O cliente interage com todos os elementos por meio do contrato `Component`.

Quando a operação é executada em uma `Leaf`, ela responde diretamente. Quando a mesma operação é executada em um `Composite`, ele percorre seus filhos e agrega o resultado recursivamente.

Com isso, a aplicação consegue tratar estruturas hierárquicas inteiras como se fossem um único objeto, o que simplifica navegação, agregação e composição de regras.

## Diagrama PlantUML

O diagrama deste padrão está em [composite.puml](./composite.puml).

## Ideia arquitetural

O Composite é útil quando o domínio tem uma estrutura naturalmente hierárquica, em árvore, e o sistema precisa tratar objetos individuais e agrupamentos de objetos pelo mesmo contrato.

Sem esse padrão, é comum aparecer código cheio de verificações condicionais do tipo “se é pasta faça isso, se é arquivo faça aquilo”, ou “se é role simples use uma regra, se é role composta faça outra”. Isso espalha lógica estrutural pela aplicação e torna a árvore difícil de percorrer e evoluir.

O ganho arquitetural do Composite está em mover a inteligência da hierarquia para dentro da própria estrutura. Assim, o cliente deixa de conhecer detalhes da composição e passa a trabalhar com uma interface única.

Esse padrão funciona especialmente bem quando operações como listar, somar, validar, imprimir ou verificar acesso precisam percorrer toda a árvore de forma uniforme.
