# Bridge para Tipos de Dados e Armazenamento

## Contexto

Uma aplicação precisa persistir dados de usuários e produtos em diferentes meios, como memória, Redis e PostgreSQL, sem acoplar cada tipo de dado a uma tecnologia específica de armazenamento.

## Solução

O Bridge separa o tipo de dado da tecnologia de persistência, permitindo combinar qualquer entidade com qualquer mecanismo de armazenamento.

## Impacto arquitetural

- Separa a evolução do domínio da evolução da infraestrutura.
- Evita multiplicação de classes combinatórias por tipo de dado e storage.
- Introduz mais indireção entre a abstração e a implementação técnica.

## Executar

```bash
npm install
npm start
```
