FROM node:12.14-alpine AS build
WORKDIR /src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 4200
# RUN npm run start
RUN npm run build

FROM nginx
COPY ../nginx/default.conf /etc/nginx/default.conf
COPY --from=build /src/app/dist/client /usr/share/nginx/html