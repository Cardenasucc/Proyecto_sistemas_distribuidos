FROM node:20

# Cambia a usuario root para poder instalar dependencias
USER root

# Instala herramientas necesarias
RUN apt-get update && apt-get install -y wget nano

# Limpia la caché de npm
RUN npm cache clean --force

# Instala una versión específica de npm
RUN npm install -g npm@8.12.1

# Crea los directorios para cada microservicio
RUN mkdir -p /usr/usersAPI \
    /ord/ordersAPI \
    /mem/membershipsAPI \
    /pro/productsAPI

# Instala dependencias para usersAPI
WORKDIR /usr/usersAPI
COPY users/package*.json ./
RUN npm run install-all
RUN npm run install-dev
COPY users/ ./

# Instala dependencias para ordersAPI
WORKDIR /ord/ordersAPI
COPY orders/package*.json ./
RUN npm run install-all
RUN npm run install-dev
COPY orders/ ./

# Instala dependencias para membershipsAPI
WORKDIR /mem/membershipsAPI
COPY memberships/package*.json ./
RUN npm run install-all
RUN npm run install-dev
COPY memberships/ ./

# Instala dependencias para productsAPI
WORKDIR /pro/productsAPI
COPY products/package*.json ./
RUN npm run install-all
RUN npm run install-dev
COPY products/ ./

# Genera los archivos de Prisma en cada servicio
WORKDIR /usr/usersAPI
RUN npx prisma generate

# Cambia el comando para usar nodemon en el servicio de usuarios (puedes cambiarlo a otro)
CMD ["npx", "nodemon", "app.js"]
