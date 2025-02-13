NAME := severfree
COMPOSE := docker compose -f srcs/docker-compose.yml

# ifneq ($(wildcard srcs/.env),)
# include srcs/.env
# endif

all: build up

build:
	@/bin/sh ./srcs/set_proxy.sh
	$(COMPOSE) build

up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

restart: down up

ps:
	$(COMPOSE) ps -a

logs:
	$(COMPOSE) logs -f

x:
	docker exec -it nginx bash

db:
	docker exec -it postgres bash

django:
	docker exec -it django bash

adminer:
	docker exec -it adminer bash

vite:
	docker exec -it vite bash

clean:
	@$(COMPOSE) down --rmi all --volumes --remove-orphans
	@docker system prune -a

re: down all

.PHONY: all build up down restart ps logs x db django adminer vite clean re
