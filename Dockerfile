# Build Stage 1
# FROM node:18-alpine3.15 AS appbuild
FROM node:18-slim AS appbuild

USER node
WORKDIR /usr/src/app
COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY ./src ./src
RUN npm run build

# Build Stage 2
# FROM node:18-alpine3.15
FROM node:18-slim
USER node
WORKDIR /usr/src/app
COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY --from=appbuild /usr/src/app/dist ./dist
EXPOSE 3000
CMD npm run start:dev
# CMD [ "tail", "-f", "/dev/null" ]
