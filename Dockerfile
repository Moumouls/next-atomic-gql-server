FROM node:alpine
ENV NODE_ENV=production

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

COPY . /srv/app

WORKDIR /srv/app

RUN NODE_ENV=development yarn && yarn build && rm -rf node_modules && yarn --prod && yarn cache clean

# Server run on 80
CMD node lib/index.js