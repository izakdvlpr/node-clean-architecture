FROM docker.io/node:lts-alpine

WORKDIR /app

RUN apk update && apk upgrade openssl

CMD ["tail", "-f", "/dev/null"]