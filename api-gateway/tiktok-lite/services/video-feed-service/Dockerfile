FROM node:20-alpine

WORKDIR /app

COPY services/video-feed-service/package*.json ./
RUN npm ci

COPY services/video-feed-service/src ./src
COPY proto ./proto

EXPOSE 50053

CMD ["node", "src/server.js"]
