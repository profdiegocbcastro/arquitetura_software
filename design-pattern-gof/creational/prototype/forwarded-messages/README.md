# Prototype para Mensagens Encaminhadas

## Contexto

Uma equipe precisa encaminhar a mesma mensagem-base para vários destinatários, preservando assunto, remetente original, anexos e corpo principal, mas alterando pequenas partes como saudação, destinatário final e observações adicionais.

## Solução

O Prototype mantém uma mensagem-base pronta para encaminhamento e gera clones personalizados para cada destinatário, evitando reconstrução manual da mesma estrutura.

## Impacto arquitetural

- Reduz repetição ao encaminhar mensagens semelhantes para vários destinatários.
- Preserva consistência entre mensagens derivadas do mesmo modelo.
- Exige cuidado para clonar corretamente anexos, metadados e listas internas.

## Executar

```bash
npm install
npm start
```
