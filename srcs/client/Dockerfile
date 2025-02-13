FROM node:20-buster

ARG HTTP_PROXY
ARG HTTPS_PROXY

ENV HTTP_PROXY=${HTTP_PROXY}
ENV HTTPS_PROXY=${HTTPS_PROXY}

WORKDIR /app

COPY entrypoint.sh /

COPY . /app/

RUN apt-get update && apt-get install -y vim net-tools lsof && \
    ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    unset HTTP_PROXY HTTPS_PROXY

RUN npm install

RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
