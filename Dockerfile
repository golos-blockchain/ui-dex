FROM node:14 as build

WORKDIR /var/app
COPY . /var/app
RUN npm install
RUN npm run build

FROM nginx:latest

COPY --from=build /var/app/build /usr/share/nginx/html

EXPOSE 80
