# Nginx 部署说明

本文档说明如何部署已生成的 H5 压缩包：

```text
dist/cpic-demo-h5-production-history.zip
```

当前前端使用 history mode，并部署在域名根路径 `/`。

## 1. 压缩包放置位置

将压缩包上传到服务器临时目录，例如：

```text
/tmp/cpic-demo-h5-production-history.zip
```

站点目录建议使用：

```text
/var/www/cpic-demo
```

在服务器上执行：

```bash
sudo mkdir -p /var/www/cpic-demo
cd /var/www/cpic-demo
sudo unzip -o /tmp/cpic-demo-h5-production-history.zip
```

解压后目录结构应为：

```text
/var/www/cpic-demo/index.html
/var/www/cpic-demo/assets/
/var/www/cpic-demo/static/
```

## 2. Nginx 配置

新建或编辑 Nginx 配置文件，例如：

```text
/etc/nginx/conf.d/cpic-demo.conf
```

配置内容：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/cpic-demo;
    index index.html;

    location ^~ /assets/ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        try_files $uri =404;
    }

    location ^~ /static/ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
        try_files $uri =404;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

需要替换：

- `your-domain.com`：替换为真实域名

## 3. 生效配置

执行：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 4. 验证

访问：

```text
https://your-domain.com/
```

直接刷新业务页面也应正常返回前端页面，例如：

```text
https://your-domain.com/pages/root/home
```

如果刷新子页面出现 404，检查 Nginx 是否包含：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
