# =========================================================
# Imagem Base
# =========================================================
#
# Utilizamos Node.js 20 baseado em Debian (bookworm-slim).
#
# Motivos:
# - Melhor compatibilidade com Prisma
# - Suporte a bibliotecas nativas usadas pelo ORM
# - Imagem relativamente leve
#
FROM node:20-bookworm-slim

# =========================================================
# Diretório de Trabalho
# =========================================================
#
# Define o diretório onde a aplicação será executada
# dentro do container.
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
# Copia todos os arquivos do projeto para dentro
# do container.
#
COPY . .

# =========================================================
# Geração do Prisma Client
# =========================================================
#
# O Prisma gera um ORM client baseado no arquivo:
#
# prisma/schema.prisma
#
# Esse client será utilizado pelos repositories
# para acessar o banco de dados.
#
RUN npx prisma generate

# =========================================================
# Porta da Aplicação
# =========================================================
#
# A aplicação GraphQL roda na porta 4000.
#
EXPOSE 4000

# =========================================================
# Inicialização do Container
# =========================================================
#
# Quando o container inicia:
#
# 1) Prisma sincroniza o banco (db push)
# 2) Executa o seed para popular dados iniciais
# 3) Inicia o servidor Node.js
#
CMD sh -c "npx prisma db push && node prisma/seed.js && npm start"