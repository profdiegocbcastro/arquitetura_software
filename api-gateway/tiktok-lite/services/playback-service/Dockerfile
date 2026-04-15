FROM node:20-alpine

WORKDIR /app

COPY services/playback-service/package*.json ./
RUN npm ci

COPY services/playback-service/src ./src
COPY proto ./proto
COPY media ./media

EXPOSE 50051
EXPOSE 7000

CMD ["node", "src/server.js"]
