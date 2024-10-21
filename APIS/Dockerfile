FROM node:20

USER root

RUN apt-get update && apt-get install -y \
    wget \
    nano

# Limpia la caché de npm
RUN npm cache clean --force

# Actualiza npm a una versión específica
RUN npm install -g npm@8.12.1

# Instala las dependencias globales necesarias
RUN npm install -g prisma \
    && npm install -g cors \
    && npm install -g dotenv \
    && npm install -g express \
    && npm install -g jsonwebtoken \
    && npm install -g nodemon -D\
    && npm install -g @prisma/client\
    && npm install -g crypto-js\
    && npm install -g cryptojs\
    && npm install -g sqlite


# Crea el directorio de la aplicación
RUN mkdir -p /usr/usersAPI
RUN mkdir -p /ord/ordersAPI
RUN mkdir -p /mem/membershipsAPI
RUN mkdir -p /pro/productsAPI


# Establece el directorio de trabajo
WORKDIR /usr/usersAPI
WORKDIR /ord/ordersAPI
WORKDIR /mem/membershipsAPI
WORKDIR /pro/productsAPI

# Copia el archivo package.json y package-lock.json
COPY users/package*.json ./
COPY orders/package*.json /ord/ordersAPI/
COPY memberships/package*.json /mem/membershipsAPI/
COPY products/package*.json /pro/productsAPI/

# Instala las dependencias del proyecto
RUN npm install
RUN npm install dotenv --save--dev

# Copia el resto de la aplicación
COPY users ./
COPY orders /ord/ordersAPI/
COPY memberships /mem/membershipsAPI/
COPY products /pro/productsAPI/

# Genera los archivos de Prisma
RUN npx prisma generate

# Cambia el comando para usar nodemon
CMD ["npx", "nodemon", "app.js"]