FROM node:10 as builder

RUN apt-get update && apt-get install build-essential nasm && rm -rf /var/lib/apt/lists/*

WORKDIR /source

COPY package.json .

RUN npm install

COPY . .

ARG DEPLOY_TYPE=build

RUN npm run "$DEPLOY_TYPE"

FROM alpine:latest as deployer

RUN apk update && apk add --no-cache sshpass rsync openssh-client

COPY --from=builder /source/build ./dist

ARG DEPLOY_HOST=127.0.0.1
ARG DEPLOY_PASS=password
ARG DEPLOY_NAME=awesomeproject
ARG DEPLOY_PATH=/var/www

RUN sshpass -p "$DEPLOY_PASS" rsync -e "ssh -o StrictHostKeyChecking=no" -avz --delete ./dist $DEPLOY_HOST:$DEPLOY_PATH/$DEPLOY_NAME
