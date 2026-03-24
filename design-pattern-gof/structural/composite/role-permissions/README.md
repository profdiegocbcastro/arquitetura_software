# Composite para Papéis e Permissões

## Contexto

Um sistema de autorização precisa permitir permissões simples e papéis compostos, onde uma role pode agregar permissões diretas e também conter outras roles.

## Solução

O Composite trata permissões simples e roles compostas pelo mesmo contrato, permitindo verificar acesso de forma recursiva pela árvore de permissões.

## Impacto arquitetural

- Facilita modelagem de autorização hierárquica.
- Centraliza a lógica de agregação de permissões dentro da própria estrutura.
- Pode exigir atenção extra para evitar ciclos ou hierarquias excessivamente profundas.

## Executar

```bash
npm install
npm start
```
