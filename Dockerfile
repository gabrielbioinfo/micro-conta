# Build Stage 1
FROM node:18-alpine3.15 AS appbuild
WORKDIR /usr/src/app
COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY ./src ./src
RUN npm run build

# Build Stage 2
FROM node:18-alpine3.15
# FROM node:16-slim

USER node

WORKDIR /usr/src/app
COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY --from=appbuild /usr/src/app/dist ./dist
EXPOSE 3000
CMD npm run start:dev
# CMD [ "tail", "-f", "/dev/null" ]

FROM node:18-alpine3.15
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]

# FROM node:16-slim

# WORKDIR /usr/src/app
# COPY package.json ./
# COPY tsconfig.json ./
# RUN npm install
# USER node

# COPY ./src ./src

# CMD [ "tail", "-f", "/dev/null" ]
