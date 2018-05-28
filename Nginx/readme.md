##Nginx 配置
    #运行用户
    #user somebody;

    #启动进程,通常设置成和cpu的数量相等
    worker_processes  1;

    #全局错误日志
    error_log  D:/Tools/nginx/logs/error.log;
    error_log  D:/Tools/nginx/logs/notice.log  notice;
    error_log  D:/Tools/nginx/logs/info.log  info;
    #制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg

    #PID文件，记录当前启动的nginx的进程ID
    pid        D:/Tools/nginx/logs/nginx.pid;

    #工作模式及连接数上限
    events {
        worker_connections 1024;    #单个后台worker process进程的最大并发链接数
        accept_mutex on;            #设置网路连接序列化，防止惊群现象发生，默认为on
        multi_accept on;            #设置一个进程是否同时接受多个网络连接，默认为off
        #use epoll;                 #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
    }

    #设定http服务器，利用它的反向代理功能提供负载均衡支持
    http {

        include       mime.types;          #设定mime类型(邮件支持类型),类型由mime.types文件定义
        default_type  application/octet-stream;      #默认文件类型，默认为text/plain

        #access_log off; #取消服务日志
        log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'; #自定义日志格式
        access_log    D:/Tools/nginx/logs/access.log myFormat;    #combined为日志格式的默认值
        rewrite_log     on;

        #sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，对于普通应用，必须设为 on,如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，以平衡磁盘与网络I/O处理速度，降低系统的uptime。默认为off，可以在http块，server块location块。
        sendfile        on;
        sendfile_max_chunk 100k;  #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
        keepalive_timeout 120;  #连接超时时间，默认为75s，可以在http，server，location块。
        #tcp_nopush     on;
        tcp_nodelay        on;

        #gzip压缩开关
        #gzip  on;

        #设定实际的服务器列表
        upstream my_server{
            server 127.0.0.1:8089;
            server 192.168.10.121:3333 backup;  #热备
        }

        #HTTP服务器
        server {
            listen       80;      #监听80端口，80端口是知名端口号，用于HTTP协议
            server_name  www.helloworld.com;      #定义使用www.xx.com访问

            #首页
            index index.html

            #指向webapp的目录
            root D:\SourceCode\src\Web;

            #编码格式
            charset utf-8;

            #代理配置参数
            proxy_connect_timeout 180;
            proxy_send_timeout 180;
            proxy_read_timeout 180;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarder-For $remote_addr;

            #反向代理的路径（和upstream绑定），location 后面设置映射的路径
            location  ~*^.+$ {       #请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。
                #root path;  #根目录
                #index vv.txt;  #设置默认页
                proxy_pass  http://my_server;  #请求转向my_server 定义的服务器列表
                deny 127.0.0.1;  #拒绝的ip
                allow 172.18.5.54; #允许的ip
            }

            #静态文件，nginx自己处理
            location ~ ^/(images|javascript|js|css|flash|media|static)/ {
                root D:\01_Workspace\Project\github\zp\SpringNotes\spring-security\spring-shiro\src\main\webapp\views;
                #过期30天，静态文件不怎么更新，过期可以设大一点，如果频繁更新，则可以设置得小一点。
                expires 30d;
            }

            #设定查看Nginx状态的地址
            location /NginxStatus {
                stub_status           on;
                access_log            on;
                auth_basic            "NginxStatus";
                auth_basic_user_file  conf/htpasswd;
            }

            #禁止访问 .htxxx 文件
            location ~ /\.ht {
                deny all;
            }

            #错误处理页面（可选择性配置）
            #error_page   404              /404.html;
            #error_page   500 502 503 504  /50x.html;
            #location = /50x.html {
            #    root   html;
            #}
        }
    }