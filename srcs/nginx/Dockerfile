FROM nginx:latest

ARG HTTP_PROXY
ARG HTTPS_PROXY

COPY conf/nginx.conf /etc/nginx/

COPY conf/default.conf /etc/nginx/conf.d/

COPY entrypoint.sh /tmp/
RUN chmod +x /tmp/entrypoint.sh

CMD ["/tmp/entrypoint.sh"]
