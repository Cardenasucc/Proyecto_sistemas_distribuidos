FROM node:20

# No necesitas cambiar el usuario a root porque ya lo es en esta imagen.

# Instala herramientas necesarias y limpia los archivos temporales de apt
RUN apt-get update && apt-get install -y wget nano && rm -rf /var/lib/apt/lists/*

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
RUN npm install
RUN npm run install-dev
COPY users/ ./

# Genera archivos de Prisma para usersAPI
RUN npx prisma generate

# Instala dependencias para ordersAPI
WORKDIR /ord/ordersAPI
COPY orders/package*.json ./
RUN npm install
RUN npm run install-dev
COPY orders/ ./

# Genera archivos de Prisma para ordersAPI
RUN npx prisma generate

# Instala dependencias para membershipsAPI
WORKDIR /mem/membershipsAPI
COPY memberships/package*.json ./
RUN npm install
RUN npm run install-dev
COPY memberships/ ./

# Genera archivos de Prisma para membershipsAPI
RUN npx prisma generate

# Instala dependencias para productsAPI
WORKDIR /pro/productsAPI
COPY products/package*.json ./
RUN npm install
RUN npm run install-dev
COPY products/ ./

# Genera archivos de Prisma para productsAPI
RUN npx prisma generate

# Cambia el comando para usar nodemon en el servicio de usuarios (puedes cambiarlo a otro si es necesario)
WORKDIR /usr/usersAPI
CMD ["npx", "nodemon", "app.js"]
