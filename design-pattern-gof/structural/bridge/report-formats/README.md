# Bridge para Relatórios e Formatos

## Contexto

Uma plataforma analítica precisa gerar relatórios de vendas, usuários e financeiro em múltiplos formatos, como PDF, Excel e HTML, sem criar uma classe específica para cada combinação possível.

## Solução

O Bridge separa o tipo de relatório da tecnologia de formatação, permitindo combinar qualquer relatório com qualquer formato em tempo de execução.

## Impacto arquitetural

- Evita explosão de subclasses combinatórias.
- Permite evoluir relatórios e formatos de forma independente.
- Introduz mais abstrações e composição no desenho da solução.

## Executar

```bash
npm install
npm start
```
