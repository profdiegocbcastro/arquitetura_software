# Singleton

Esta pasta contém dois exemplos práticos do padrão Singleton.

## Exemplos

- `postgres-connection-pool`: centraliza a criação e o reuso de um pool de conexões para PostgreSQL.
- `high-processing-cache`: centraliza um cache em memória para resultados de processamento custoso.

## Componentes do padrão

- `Singleton`: classe responsável por controlar a criação da instância única e expor um ponto global de acesso.
- `Recurso compartilhado`: objeto encapsulado pelo singleton, como um pool de conexões, cache, logger ou configuração.
- `Clientes`: classes da aplicação que dependem do recurso compartilhado, como repositórios, serviços ou controllers.

## Como os componentes se comunicam

Os clientes não criam o recurso diretamente. Em vez disso, chamam um método de acesso, como `getInstance()`, na classe singleton.

A classe singleton verifica se a instância já existe. Se não existir, cria a instância e a mantém internamente. Se já existir, apenas devolve a mesma referência.

Depois disso, os clientes usam o recurso compartilhado obtido por meio do singleton para executar suas operações, mantendo um único ponto de controle sobre esse recurso.

## Diagrama PlantUML

O diagrama deste padrão está em [singleton.puml](./singleton.puml).

## Ideia arquitetural

O Singleton é útil quando a aplicação precisa de um único ponto de acesso para um recurso compartilhado, como pool de conexões, cache, logger ou configuração global.

Ele não deve ser usado como atalho para estado global indiscriminado. Quando mal aplicado, aumenta acoplamento, dificulta testes e espalha dependências implícitas pela aplicação.
