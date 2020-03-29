FROM node:12.16.1-alpine AS BUILD

WORKDIR /var/app
COPY ./.yarnclean ./.yarnclean
COPY ./yarn.lock ./yarn.lock
COPY ./lerna.json ./lerna.json
COPY ./package.json ./package.json
COPY ./packages/api/package.json ./packages/api/package.json
COPY ./packages/dtos/package.json ./packages/dtos/package.json
COPY ./packages/ui/package.json ./packages/ui/package.json
RUN yarn install --frozen-lockfile
COPY ./ ./
RUN yarn build
