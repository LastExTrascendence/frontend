FROM node:lts-alpine3.18

WORKDIR /app

EXPOSE 3333

ENTRYPOINT [ "/bin/sh", "-c", "yarn install && yarn dev" ]