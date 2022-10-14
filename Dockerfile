FROM node:14 AS build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm ci
RUN npm run build

FROM node:14

RUN mkdir -p /app
WORKDIR /app

COPY --from=build /usr/src/app/.output /app

EXPOSE 3000

CMD [ "node", "server/index.mjs" ]
