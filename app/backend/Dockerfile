# Dockerfile for NodeJS app

FROM node:latest

WORKDIR /app/backend

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]