FROM node:lts-alpine

WORKDIR /app

RUN corepack enable pnpm

COPY . .
RUN corepack up
RUN pnpm install
RUN pnpm build

CMD [ "pnpm", "--filter=server", "start" ]