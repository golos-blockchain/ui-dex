FROM node:14 as builder

WORKDIR /source

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=builder /source/build /usr/share/nginx/html

EXPOSE 80
