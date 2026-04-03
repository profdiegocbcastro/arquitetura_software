# =========================================================
# Imagem Base
# =========================================================
FROM node:20-alpine

# =========================================================
# Diretório de Trabalho
# =========================================================
#
# Define o diretório padrão onde todos os comandos
# seguintes serão executados dentro do container.
#
# Toda a aplicação ficará dentro de:
#
# /app
#
WORKDIR /app

# =========================================================
# Instalação de Dependências
# =========================================================
#
# Primeiro copiamos apenas os arquivos de dependência
# da aplicação.
#
# Isso permite que o Docker utilize o cache de build.
#
# Ou seja:
# - Se o código mudar
# - Mas o package.json não mudar
#
# O Docker NÃO reinstalará as dependências.
#
COPY package*.json ./

# Instala todas as dependências do projeto
#
# npm ci é utilizado em vez de npm install porque:
# - Instala exatamente o que está no package-lock.json
# - Mais rápido
# - Ideal para ambientes de build e produção
#
RUN npm ci

# =========================================================
# Copiando o Código da Aplicação
# =========================================================
#
# Após instalar as dependências copiamos apenas
# o código-fonte da aplicação.
#
# Nesse exemplo estamos copiando apenas a pasta src,
# onde está o servidor GraphQL.
#
COPY src ./src

# =========================================================
# Porta da Aplicação
# =========================================================
#
# Informa ao Docker que a aplicação expõe a porta 4000.
#
# Essa porta será usada pelo servidor Node.js
# para receber requisições HTTP / GraphQL.
#
EXPOSE 4000

# =========================================================
# Inicialização do Container
# =========================================================
#
# Quando o container iniciar, o Docker executará
# o comando abaixo.
#
# Nesse caso estamos iniciando diretamente
# o arquivo principal da aplicação Node.js.
#
# src/index.js
#
CMD ["node", "src/index.js"]