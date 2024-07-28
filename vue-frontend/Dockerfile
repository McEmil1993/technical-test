FROM node:20.14.0 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Second stage: serve the application with Nginx
FROM nginx:alpine as production-stage

# Copy the build output from the first stage to the nginx html directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy the nginx configuration file
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]