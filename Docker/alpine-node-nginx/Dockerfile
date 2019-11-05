FROM node:lts-alpine

# use USTC mirror
RUN echo "https://mirrors.ustc.edu.cn/alpine/latest-stable/main/" > /etc/apk/repositories

ENV TIME_ZONE Asia/Shanghai
RUN apk add --no-cache tzdata
RUN ln -snf /usr/share/zoneinfo/${TIME_ZONE} /etc/localtime && echo "${TIME_ZONE}" > /etc/timezone
RUN apk del tzdata

# update
RUN apk update && apk upgrade
RUN apk add nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]