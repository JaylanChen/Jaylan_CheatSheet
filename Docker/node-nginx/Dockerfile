FROM node:lts-alpine as build-stage

ENV TIME_ZONE Asia/Shanghai
RUN apk add --no-cache tzdata
RUN ln -snf /usr/share/zoneinfo/${TIME_ZONE} /etc/localtime && echo "${TIME_ZONE}" > /etc/timezone
RUN apk del tzdata

WORKDIR /app
COPY package*.json ./
RUN npm config set registry="https://registry.npm.taobao.org"
RUN cnpm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

ENV TIME_ZONE Asia/Shanghai
RUN apk add --no-cache tzdata
RUN ln -snf /usr/share/zoneinfo/${TIME_ZONE} /etc/localtime && echo "${TIME_ZONE}" > /etc/timezone
RUN apk del tzdata

COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.default.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]