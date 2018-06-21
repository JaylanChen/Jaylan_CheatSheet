# Node & Nginx image

FROM ubuntu

MAINTAINER jaylan

LABEL Description="This image is the Node & Nginx image."  Version="1.0"

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update

RUN apt-get install -y nginx

RUN apt-get install -y nodejs

RUN apt-get install -y npm