# Definir la imagen base
FROM nginx:1.21.0-alpine

# Eliminar la configuración por defecto
RUN rm -rf /etc/nginx/conf.d/*

# Copiar la configuración personalizada
COPY nginx.conf /etc/nginx/conf.d/

# Copiar los archivos de la aplicación
COPY build /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar el servidor NGINX
CMD ["nginx", "-g", "daemon off;"]
