# Stage 1: Build the Vue.js application
FROM node:20.14.0 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine as production-stage

# Copy the build output from the first stage to the nginx html directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy the nginx configuration file
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Install Certbot
RUN apk add --no-cache certbot certbot-nginx

CMD ["sh", "-c", "nginx -g 'daemon off;' & certbot --nginx -d dacoylomarkemilcajes.site --non-interactive --agree-tos -m markcajes40@gmail.com"]