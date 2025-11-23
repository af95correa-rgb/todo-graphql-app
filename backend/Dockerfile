# Dockerfile para el Backend
# Este archivo le dice a Docker cómo construir el contenedor del backend

# Usamos Node.js versión 18 como base
FROM node:18-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias primero
# Esto optimiza el cache de Docker
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto 4000 (donde corre nuestro servidor)
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["npm", "start"]