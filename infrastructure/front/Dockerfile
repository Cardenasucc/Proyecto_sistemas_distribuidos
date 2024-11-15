# Usar una imagen de Node para construir la aplicación
FROM node:18 AS build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Usar una imagen de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos construidos de la aplicación al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto en el que Nginx está sirviendo la aplicación
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
