FROM node:20-alpine

WORKDIR /usr/server

COPY package.json ./

RUN corepack enable pnpm

RUN pnpm i

COPY . . 

ENV NODE_ENV=production

CMD ["pnpm", "start"]