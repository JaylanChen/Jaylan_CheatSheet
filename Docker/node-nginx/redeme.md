# 前端打包（docker 中打包）

## 分步打包，先构建，然后再部署
```
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
```

## node 和 nginx一起

```
FROM node:lts-alpine

ENV TIME_ZONE Asia/Shanghai
RUN apk add --no-cache tzdata
RUN ln -snf /usr/share/zoneinfo/${TIME_ZONE} /etc/localtime && echo "${TIME_ZONE}" > /etc/timezone
RUN apk del tzdata

# update
RUN apk update && apk upgrade
RUN apt-get install -y nginx

WORKDIR /app
COPY . /app/
RUN  npm install  && npm run build
RUN ADD * /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
```