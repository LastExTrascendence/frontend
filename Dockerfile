FROM node:lts-alpine3.18

RUN apk add curl

WORKDIR /app

EXPOSE 3333

ENTRYPOINT [ "/bin/sh", "-c", "npm install && npm run dev" ]