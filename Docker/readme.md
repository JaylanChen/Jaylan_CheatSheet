# Docker

# 常用命名

## docker ps [OPTIONS]
列出所有在运行的容器信息

OPTIONS说明：
    -a :显示所有的容器，包括未运行的。
    -f :根据条件过滤显示的内容。
    --format :指定返回值的模板文件。
    -l :显示最近创建的容器。
    -n :列出最近创建的n个容器。
    --no-trunc :不截断输出。
    -q :静默模式，只显示容器编号。
    -s :显示总的文件大小。

## docker images [OPTIONS] [REPOSITORY[:TAG]]
列出本地镜像

OPTIONS说明：
    -a :列出本地所有的镜像（含中间映像层，默认情况下，过滤掉中间映像层）；
    --digests :显示镜像的摘要信息；
    -f :显示满足条件的镜像；
    --format :指定返回值的模板文件；
    --no-trunc :显示完整的镜像信息；
    -q :只显示镜像ID。

## docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
OPTIONS说明：

    -a stdin: 指定标准输入输出内容类型，可选 STDIN/STDOUT/STDERR 三项；

    -d: 后台运行容器，并返回容器ID；

    -i: 以交互模式运行容器，通常与 -t 同时使用；

    -t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；

    --name="nginx-lb": 为容器指定一个名称；

    --dns 8.8.8.8: 指定容器使用的DNS服务器，默认和宿主一致；

    --dns-search example.com: 指定容器DNS搜索域名，默认和宿主一致；

    -h "mars": 指定容器的hostname；

    -e username="ritchie": 设置环境变量；

    --env-file=[]: 从指定文件读入环境变量；

    --cpuset="0-2" or --cpuset="0,1,2": 绑定容器到指定CPU运行；

    -m :设置容器使用内存最大值；

    --net="bridge": 指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型；

    --link=[]: 添加链接到另一个容器；

    --expose=[]: 开放一个端口或一组端口； 