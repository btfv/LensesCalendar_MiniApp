FROM node:14.17.3-alpine
WORKDIR /usr/src
COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile
COPY . .
EXPOSE 10888