#!/bin/sh

ENV_FILE="./srcs/.env"
HTTP_PROXY_VALUE=$(env | grep "^HTTP_PROXY=" | cut -d '=' -f 2)
HTTPS_PROXY_VALUE=$(env | grep "^HTTPS_PROXY=" | cut -d '=' -f 2)

if [ -f "$ENV_FILE" ]; then
  grep -v "^HTTP_PROXY=" $ENV_FILE | grep -v "^HTTPS_PROXY=" > $ENV_FILE
fi

{
  echo "# proxy setting" >> $ENV_FILE
  echo "HTTP_PROXY=$HTTP_PROXY_VALUE" >> $ENV_FILE
  echo "HTTPS_PROXY=$HTTPS_PROXY_VALUE" >> $ENV_FILE
}
