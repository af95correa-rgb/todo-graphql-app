# Dockerfile para el Frontend
# Usamos nginx para servir los archivos estáticos HTML/CSS/JS

# Imagen base de nginx
FROM nginx:alpine

# Copiamos nuestros archivos al directorio de nginx
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/

# Exponemos el puerto 80 (puerto estándar de HTTP)
EXPOSE 80

# nginx se inicia automáticamente con esta imagen