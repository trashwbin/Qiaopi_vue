<p align="center">
	<img alt="logo" src="https://gitee.com/trashwbin/qiaopi_vue/raw/master/init_qiaopi_vue/images/logo.png">
</p>
<h4 align="center">跨越四海，侨缘线牵——侨缘信使，让世界没有距离。</h4>
<p align="center">
	<a href="https://gitee.com/trashwbin/qiaopi"><img src="https://img.shields.io/badge/%E5%90%8E%E7%AB%AF%E5%B7%A5%E7%A8%8B-%E5%90%8E%E7%AB%AF%E5%B7%A5%E7%A8%8B?logo=gitee&label=gitee&labelColor=%23C71D23&color=%23000"></a>
    <a href="https://gitee.com/trashwbin/qiaopi_vue"><img src="https://img.shields.io/badge/%E4%BE%A8%E7%BC%98%E4%BF%A1%E4%BD%BF-github?logo=github&label=github&color=%23181717"></a>
	<a href="https://gitee.com/trashwbin/qiaopi"><img src="https://img.shields.io/badge/Qiaopi-v1.0.1-brightgreen.svg"></a>
	<a href="https://gitee.com/trashwbin/qiaopi_vue/blob/master/LICENSE"><img src="https://img.shields.io/github/license/mashape/apistatus.svg"></a>
</p>


## 项目介绍

《**侨缘信使**》是一个旨在宣传和传承侨批文化的互动网站。文化内容的数字化呈现、互动性与教育性的结合、情感共鸣的构建以及用户参与的文化共创。我们致力于通过网站，让更多人了解并参与到侨批文化的保护与传承中来，同时为文化带来新的活力。学习侨批文化、体验写侨批、收侨批和漂流瓶等功能，感受慢信文化的魅力，"跨越四海，侨缘线牵——侨缘信使，让世界没有距离。"

**技术栈**：***JavaScript、Vue2、Vue Router、Pinia、Canvas、Element UI、Webpack、ESLint、Axios***

## **在线体验**

**[侨缘信使🎉](http://您的后端服务地址)**

## 演示图

<table>
    <tr>
        <td><img src="https://gitee.com/trashwbin/qiaopi_vue/raw/master/init_qiaopi_vue/images/home.png"/></td>
        <td><img src="https://gitee.com/trashwbin/qiaopi_vue/raw/master/init_qiaopi_vue/images/home-receive.png"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/trashwbin/qiaopi_vue/raw/master/init_qiaopi_vue/images/home-introduce.gif"/></td>
        <td><img src="https://gitee.com/trashwbin/qiaopi_vue/raw/master/init_qiaopi_vue/images/home-history.gif"/></td>
    </tr>
    <tr>
        <td><img src="https://gitee.com/trashwbin/qiaopi_vue/raw/master/init_qiaopi_vue/images/write-letter.gif"/></td>
        <td><img src="https://gitee.com/trashwbin/qiaopi_vue/raw/master/init_qiaopi_vue/images/nav-ai.png"/></td>
    </tr>
	<tr>
        <td><img src="https://gitee.com/trashwbin/qiaopi_vue/raw/master/init_qiaopi_vue/images/send-letter.gif"/></td>
        <td><img src="https://gitee.com/trashwbin/qiaopi_vue/raw/master/init_qiaopi_vue/images/drifting.png"/></td>
    </tr>	 
    <tr>
        <td><img src="https://gitee.com/trashwbin/qiaopi_vue/raw/master/init_qiaopi_vue/images/game-explore.gif"/></td>
        <td><img src="https://gitee.com/trashwbin/qiaopi_vue/raw/master/init_qiaopi_vue/images/game-question.gif"/></td>
    </tr>
	<tr>
        <td><img src="https://gitee.com/trashwbin/qiaopi_vue/raw/master/init_qiaopi_vue/images/shop.gif"/></td>
        <td><img src="https://gitee.com/trashwbin/qiaopi_vue/raw/master/init_qiaopi_vue/images/marketing.gif"/></td>
    </tr>
</table>


## 快速部署

拉取后记得在终端 `npm install` ，失败可尝试 `-force`

### 高德地图服务

本项目使用了[高德开放平台API](https://console.amap.com/dev/key/app)，需自行申请，并在 `index.html`中替换

![](https://gitee.com/trashwbin/qiaopi_vue/raw/master/init_qiaopi_vue/images/amap-key.png)

![](https://gitee.com/trashwbin/qiaopi_vue/raw/master/init_qiaopi_vue/images/index-amap.png)

### WebSocket、vue.config.js

项目内多次使用WebSocket和axios请求，需替换后端服务地址为您的后端服务地址

![](https://gitee.com/trashwbin/qiaopi_vue/raw/master/init_qiaopi_vue/images/init.png)

### AES密钥⬆️

需替换AES密钥为您的后端项目设置的AES密钥

### Nginx反向代理

`nginx.conf`配置如下，替换为您的后端服务地址，将`npm run build` 打包后的 `dist` 下的文件移动到nginx的html文件夹即可

```json
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;
	
    server {
        listen 80;
        server_name  qiaopi;

        gzip on;
        gzip_min_length 1k;
        gzip_comp_level 9;
        gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
        gzip_vary on;
        gzip_disable "MSIE [1-6]\.";

        location / {
            try_files $uri $uri/ /index.html;
            proxy_set_header Host $host;
            proxy_set_header X-Real_IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location /api/ {
            proxy_pass   http://您的后端服务地址:8080/;
            proxy_set_header Host $host;
            proxy_set_header X-Real_IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location /ws/ {
            proxy_redirect off;
            proxy_pass http://您的后端服务地址:8080/ws/;
            proxy_set_header Host $host;
            proxy_set_header X-Real_IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_http_version 1.1;
            proxy_read_timeout 36000s;
            proxy_send_timeout 36000s;
            proxy_set_header Upgrade $http_upgrade;   # 升级协议头 websocket
            proxy_set_header Connection "upgrade";
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
	
	server {
		listen 443 ssl;
		server_name 您的后端服务地址;

		# SSL 配置
        ssl_certificate /www/wwwroot/www/etc/您的后端服务地址.crt; 
        ssl_certificate_key /www/wwwroot/www/etc/您的后端服务地址.private; 


		# 重定向所有 HTTPS 请求到 HTTP
		    # 匹配 MinIO 的路径
		location /qiaopi/ {
			# 重定向所有 HTTPS 请求到 HTTP
			proxy_pass http://您的后端服务地址:9000/qiaopi/;
		}
		
		location / {
			return 301 http://您的后端服务地址;
		}
	}

}

```



## 未完待续
- [ ] css样式冗余，应提取公共样式，减少体积
- [ ] WebSocket和AES密钥嵌在代码中，不利于维护
- [ ] 部分axios请求未使用request.js，不利于全局处理异常
- [ ] WebSocket重试机制复杂
- [ ] 项目打包仅使用Gzip暴力压缩，仍有其它配置提升首屏加载速度