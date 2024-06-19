FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

# make nodemon available on cli
RUN npm install -g nodemon

COPY . .
