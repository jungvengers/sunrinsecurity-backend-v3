FROM node:14

RUN mkdir -p /server

WORKDIR /server

ADD ./ /server

RUN npm install yarn; \
    yarn install; \
    npm run build

EXPOSE 3000

CMD [ "yarn", "start"]
