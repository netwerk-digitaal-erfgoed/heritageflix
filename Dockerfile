FROM node:14 AS build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm ci
RUN npm run generate

FROM nginx:alpine
LABEL org.opencontainers.image.source = "https://github.com/netwerk-digitaal-erfgoed/heritageflix"

RUN mkdir -p /app
WORKDIR /app

COPY --from=build /usr/src/app/.output/public /app
COPY ./assets/config /app/config
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000
