FROM node:lts-alpine

# use USTC mirror
RUN echo "https://mirrors.ustc.edu.cn/alpine/latest-stable/main/" > /etc/apk/repositories

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# update
RUN apk update && apk upgrade
RUN apk add nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]