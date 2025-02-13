FROM node:20-buster

ARG HTTP_PROXY
ARG HTTPS_PROXY

ENV HTTP_PROXY=${HTTP_PROXY}
ENV HTTPS_PROXY=${HTTPS_PROXY}

WORKDIR /app

RUN set -eux; \
    apt-get update && apt-get install -y vim; \
    ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime; \
    echo "Asia/Tokyo" > /etc/timezone; \
    dpkg-reconfigure -f noninteractive tzdata; \
    apt-get autoremove -y; \
    apt-get clean; \
    rm -rf /var/lib/apt/lists/*; \
    unset HTTP_PROXY HTTPS_PROXY

COPY . .
COPY entrypoint.sh /usr/local/bin/

RUN set -eux; \
    npm install

RUN set -eux; \
    ln -s usr/local/bin/entrypoint.sh /entrypoint.sh

ENTRYPOINT [ "entrypoint.sh" ]
