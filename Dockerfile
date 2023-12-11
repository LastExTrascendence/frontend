FROM node:lts-alpine3.18

WORKDIR /app

RUN yarn install

EXPOSE 8080

ENTRYPOINT [ "/bin/sh", "-c", "yarn dev" ]