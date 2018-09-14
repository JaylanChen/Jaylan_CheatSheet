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
    -a, --attach=[]            登录容器（以docker run -d启动的容器）  
    -c, --cpu-shares=0         设置容器CPU权重，在CPU共享场景使用  
    --cap-add=[]               添加权限，权限清单详见：http://linux.die.net/man/7/capabilities  
    --cap-drop=[]              删除权限，权限清单详见：http://linux.die.net/man/7/capabilities  
    --cidfile=""               运行容器后，在指定文件中写入容器PID值，一种典型的监控系统用法  
    --cpuset=""                设置容器可以使用哪些CPU，此参数可以用来容器独占CPU  
    -d, --detach=false         指定容器运行于前台还是后台   
    --device=[]                添加主机设备给容器，相当于设备直通  
    --dns=[]                   指定容器的dns服务器  
    --dns-search=[]            指定容器的dns搜索域名，写入到容器的/etc/resolv.conf文件  
    -e, --env=[]               指定环境变量，容器中可以使用该环境变量  
    --entrypoint=""            覆盖image的入口点  
    --env-file=[]              指定环境变量文件，文件格式为每行一个环境变量  
    --expose=[]                指定容器暴露的端口，即修改镜像的暴露端口  
    -h, --hostname=""          指定容器的主机名  
    -i, --interactive=false    打开STDIN，用于控制台交互  
    --link=[]                  指定容器间的关联，使用其他容器的IP、env等信息  
    --lxc-conf=[]              指定容器的配置文件，只有在指定--exec-driver=lxc时使用  
    -m, --memory=""            指定容器的内存上限  
    --name=""                  指定容器名字，后续可以通过名字进行容器管理，links特性需要使用名字  
    --net="bridge"             指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型 
    -P, --publish-all=false    Docker 会随机映射一个 49000~49900 的端口到内部容器开放的网络端口。
    -p, --publish=[]           (小写)指定要映射的IP和端口，一个端口上只可以绑定一个容器。支持的格式有:hostPort:containerPort、ip:hostPort:containerPort、 ip::containerPort
    --privileged=false         指定容器是否为特权容器，特权容器拥有所有的capabilities  
    --restart=""               指定容器停止后的重启策略，no：容器退出时不重启 on-failure：容器故障退出（返回值非零）时重启 always：容器退出时总是重启 
    --rm=false                 指定容器停止后自动删除容器(不支持以docker run -d启动的容器)  
    --sig-proxy=true           设置由代理接受并处理信号，但是SIGCHLD、SIGSTOP和SIGKILL不能被代理  
    -t, --tty=false            分配tty设备，该可以支持终端登录  
    -u, --user=""              指定容器的用户  
    -v, --volume=[]            给容器挂载存储卷，挂载到容器的某个目录  
    --volumes-from=[]          给容器挂载其他容器上的卷，挂载到容器的某个目录  
    -w, --workdir=""           指定容器的工作目录  

## docker stop $(docker ps -a -q)
停止所有镜像

## docker rm $(docker ps -a -q)
删除所有container

## docker rmi $(docker images -f "dangling=true" -q)
移除 none 的镜像

## docker rmi $(docker images -q)
删除所有image


查看

docker images           # 列出所有镜像(images)
docker ps               # 列出正在运行的容器(containers)
docker ps -a            # 列出所有的容器
docker pull centos      # 下载centos镜像
docker top <container>  # 查看容器内部运行程序

容器

docker stop <container>                  # 停止一个正在运行的容器，<container>可以是容器ID或名称
docker start <container>                 # 启动一个已经停止的容器
docker restart <container>               # 重启容器
docker rm <container>                    # 删除容器

docker run -i -t -p :80 LAMP /bin/bash   # 运行容器并做http端口转发
docker exec -it <container> /bin/bash    # 进入ubuntu类容器的bash
docker exec -it <container> /bin/sh      # 进入alpine类容器的sh

docker rm `docker ps -a -q`              # 删除所有已经停止的容器
FOR /f "tokens=*" %i IN ('docker ps -a -q') DO docker rm %i  # windows系统，用上面的命令会出错：unknown shorthand flag: 'a' in -a 
docker kill $(docker ps -a -q)           # 杀死所有正在运行的容器，$()功能同``

提交/导出

docker build --rm=true -t hjue/lamp .    # 建立映像文件。–rm 选项是告诉Docker，在构建完成后删除临时的Container，Dockerfile的每一行指令都会创建一个临时的Container，一般这些临时生成的Container是不需要的
docker commit 3a09b2588478 mynewimage    # 提交你的变更，并且把容器保存成镜像，命名为mynewimage，3a09b2588478为容器的ID

docker save mynewimage | bzip2 -9 -c> /home/save.tar.bz2  # 把 mynewimage 镜像保存成 tar 文件
bzip2 -d -c < /home/save.tar.bz2 | docker load            # 加载 mynewimage 镜像

docker export <CONTAINER ID> > /home/export.tar           # 导出Image
cat /home/export.tar | sudo docker import - mynewimage    # 导入Image镜像

镜像

docker run -i -t centos /bin/bash          # 运行centos镜像
docker run -d -p 80:80 hjue/centos-lamp    # 运行centos-lamp镜像

docker rmi [image-id]                      # 删除镜像
docker rmi $(docker images -q)             # 删除所有镜像
docker rmi $(sudo docker images --filter "dangling=true" -q --no-trunc)  # 删除无用镜像

帮助

docker run --help

日志

docker logs <container>