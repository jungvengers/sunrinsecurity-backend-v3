FROM node:18

WORKDIR /app

RUN corepack enable

COPY . .
RUN pnpm build

CMD [ "pnpm", "--filter=server", "start" ]