FROM node:lts-alpine as build-stage

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app

#docker 参数传入构建环境变量
ARG NODE_ENV
#设置容器内的环境变量
ENV NODE_ENV $NODE_ENV

ADD . /usr/src/app
RUN npm config set registry="https://registry.npm.taobao.org"

RUN cnpm install
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.default.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]