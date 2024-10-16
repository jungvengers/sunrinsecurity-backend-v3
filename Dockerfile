FROM node:18

WORKDIR /app

RUN corepack enable

COPY . .
RUN yarn global add lerna
RUN lerna bootstrap
RUN lerna run build

CMD [ "lerna", "run", "start", "--scope=server" ]