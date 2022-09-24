FROM node:14-alpine as base

WORKDIR /package

RUN apk add --update python3 make g++
RUN apk add git

COPY package.json .
RUN npm install --only=production && npm install -g typescript
COPY . .
RUN npm run build

# The last layer for distribution.
FROM node:14-alpine
WORKDIR /package
COPY --from=base /package/node_modules node_modules

COPY --from=base /package/build build

COPY --from=base /package/.env.production .env.production

ENV NODE_ENV=production

EXPOSE 6060:6060

ENTRYPOINT ["node", "build/server.js"]