FROM node:20-alpine

WORKDIR /app

COPY services/chat-service/package*.json ./
RUN npm ci

COPY services/chat-service/src ./src
COPY proto ./proto

EXPOSE 50051

CMD ["node", "src/server.js"]
