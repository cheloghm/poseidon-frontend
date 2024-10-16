# Dockerfile

# Stage 1: Build the Vue app
FROM node:16-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine AS production-stage

# Install gettext for envsubst
RUN apk add --no-cache gettext

# Copy built files from build-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy nginx.conf as a template
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Set default environment variables (can be overridden)
ENV API_SERVICE=poseidon-service
ENV API_PORT=8080

# Substitute environment variables in nginx.conf and start Nginx
CMD ["/bin/sh", "-c", "envsubst '$API_SERVICE $API_PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

EXPOSE 80
