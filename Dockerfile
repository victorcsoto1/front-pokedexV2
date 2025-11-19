# Etapa 1: build con Node
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: servir con Nginx
FROM nginx:1.23-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto que usará Cloud Run
EXPOSE 8080

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]