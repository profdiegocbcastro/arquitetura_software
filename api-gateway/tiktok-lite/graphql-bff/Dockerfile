FROM node:20-alpine

WORKDIR /app

COPY graphql-bff/package*.json ./
RUN npm ci

COPY graphql-bff/src ./src
COPY proto ./proto

EXPOSE 4000

CMD ["node", "src/index.js"]
