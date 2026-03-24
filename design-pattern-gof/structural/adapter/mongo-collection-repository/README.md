# Adapter para Repository com Mongo Collection

## Contexto

Uma camada de serviço espera trabalhar com um repositório de clientes, mas a infraestrutura disponível expõe uma collection MongoDB com operações e formato de documento diferentes do contrato usado pela aplicação.

## Solução

O Adapter encapsula a collection MongoDB e traduz suas operações para a interface de repositório esperada pelo serviço.

## Impacto arquitetural

- Separa a lógica de persistência Mongo da regra de negócio.
- Mantém a camada de serviço desacoplada da API específica da collection.
- Exige cuidado para mapear corretamente documentos e entidades do domínio.

## Executar

```bash
npm install
npm start
```
