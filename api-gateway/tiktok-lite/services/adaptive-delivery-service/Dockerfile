FROM node:20-alpine

WORKDIR /app

COPY services/adaptive-delivery-service/package*.json ./
RUN npm ci

COPY services/adaptive-delivery-service/src ./src
COPY proto ./proto

EXPOSE 50052

CMD ["node", "src/server.js"]
