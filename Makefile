all:

CONTAINER_NAME = ws-ngx-login-demo-container
IMAGE_NAME = local-ws-ngx-login-demo-dev


build-clean:
	rm -rf node_modules
	rm -rf dist

clean: build-clean

#build-dist:
	#npm install
	#gulp build.prod.aot

#build:
	#docker build -t willsonic/ws-ngx-login-demo .

build-dev:
	docker build -t local-ws-ngx-login-demo-dev -f Dockerfile.dev .

#install:
	#gcloud docker --  push willsonic/ws-ngx-login-demo

run-container:
	docker run --name $(CONTAINER_NAME) -d -p 5555:5555  $(IMAGE_NAME)

start:
	docker start $(CONTAINER_NAME)

stop:
	docker stop $(CONTAINER_NAME)

rm:
	docker rm $(CONTAINER_NAME)

up:
	docker-compose up

down:
	docker-compose down

logs:
	docker logs -f  $(CONTAINER_NAME)

ssh-exec:
	docker exec -it $(CONTAINER_NAME) sh
