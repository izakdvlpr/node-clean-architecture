FROM debian:11.6-slim

WORKDIR /app

RUN apt-get update -y
RUN apt-get install -y openssl curl unzip

RUN curl -fsSL https://bun.sh/install | bash

CMD ["tail", "-f", "/dev/null"]