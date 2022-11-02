# FROM node:12.14.0-alpine3.11
FROM node:16.18.0-alpine3.15
 
# adicionar o bash
RUN apk add --no-cache bash
 
# criar um usuário diferente do root
USER node
 
# criar o diretório principal para o usuário node
WORKDIR /home/node/app