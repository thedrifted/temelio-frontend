FROM node:18-alpine as build

RUN apk add --no-cache git

WORKDIR /app

RUN git clone git@github.com:thedrifted/temelio-frontend.git .

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
