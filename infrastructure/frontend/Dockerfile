FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["nginx", "-g", "daemon off;"]
