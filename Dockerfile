FROM node:lts-alpine

WORKDIR /app

RUN corepack enable

COPY . .
RUN pnpm build

CMD [ "pnpm", "--filter=server", "start" ]