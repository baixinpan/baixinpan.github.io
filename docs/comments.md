# 评论系统使用与迁移说明

本项目当前使用 Twikoo 作为正式评论系统，Livere 和 Disqus 保留为可切换的备用方案。

## 当前线上配置

- 前端站点：`https://baixinpan.github.io/`
- 评论后端：`https://comment.mcgfdata.com`
- 服务器容器：`twikoo-comment`
- 服务端口：`127.0.0.1:18081 -> 8080`
- 反向代理：Nginx `comment.mcgfdata.com`
- 数据目录：`/opt/twikoo/data`
- 博客配置：`_config.yml` 的 `comment` 字段

```yml
comment:
  provider: twikoo
  twikoo:
    envId: https://comment.mcgfdata.com
  disqus:
  livere: MTAyMC81MDk5NC8yNzQ3Ng
```

## 日常检查

检查 Twikoo 后端是否正常：

```bash
curl -i https://comment.mcgfdata.com/
```

正常会返回类似：

```json
{"code":100,"message":"Twikoo 云函数运行正常","version":"1.7.9"}
```

检查服务器容器：

```bash
sudo docker ps --filter name=twikoo-comment
sudo docker logs --tail=100 twikoo-comment
```

检查 Nginx 配置：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 后台管理

Twikoo 管理面板是内嵌在评论框里的，进入文章页评论区后，通过右下角的小齿轮图标打开。

- 第一次进入管理面板时，按页面提示设置管理员密码。
- 后续可在管理面板中查看、隐藏、删除评论，也可以调整部分评论配置。
- 不要把管理密码、暗号、邮件服务密钥等写入仓库。

如果忘记管理员密码，私有部署场景可以在服务器数据文件中删除 `config.ADMIN_PASS` 后重新设置：

```bash
sudo cp /opt/twikoo/data/db.json.1 /opt/twikoo/data/db.json.1.bak.$(date +%Y%m%d%H%M%S)
sudo vim /opt/twikoo/data/db.json.1
sudo docker restart twikoo-comment
```

编辑时只删除 `config.ADMIN_PASS` 对应配置，不要删除评论数据。

## 数据备份

当前 Twikoo 私有部署使用内置 LokiJS 数据库，数据持久化在服务器目录：

```text
/opt/twikoo/data
```

Twikoo 官方说明私有部署默认不需要额外数据库；如果后续评论量变大，或希望迁移到云数据库，可以通过 `MONGODB_URI` 使用外部 MongoDB。

建议迁移或升级前先备份：

```bash
sudo tar -czf /opt/twikoo/twikoo-data-$(date +%Y%m%d%H%M%S).tar.gz -C /opt/twikoo data
```

也可以把备份文件下载到本地保存：

```bash
scp deploy@43.130.52.52:/opt/twikoo/twikoo-data-YYYYMMDDHHMMSS.tar.gz .
```

如果更换服务器或登录用户，只需要把上面的主机地址替换成新的服务器地址。

## 迁移到其他云服务

迁移时优先保证两件事不变：

1. 评论数据从 `/opt/twikoo/data` 完整迁出。
2. 新后端地址更新到 `_config.yml` 的 `comment.twikoo.envId`。

推荐流程：

1. 在旧服务器备份 `/opt/twikoo/data`。
2. 在新云服务部署 Twikoo，并挂载或导入备份数据。
3. 给新服务配置 HTTPS 域名，例如 `https://comment.example.com`。
4. 本地临时把 `_config.yml` 的 `comment.twikoo.envId` 改成新地址。
5. 运行 `bundle exec jekyll build`，再打开文章页确认评论框和历史评论正常。
6. 确认后提交 `_config.yml` 变更并发布。

如果新平台使用 MongoDB、腾讯云 CloudBase、Vercel、Railway 等托管数据库或云函数，迁移前需要先从当前 Loki 数据目录导出，再按 Twikoo 官方导入方式迁入目标平台。

### 迁移到 MongoDB

如果新云服务使用 MongoDB，推荐先在新服务上准备 MongoDB 实例，然后用 `MONGODB_URI` 启动 Twikoo：

```bash
sudo docker run -d \
  --name twikoo-comment \
  --restart unless-stopped \
  -p 127.0.0.1:18081:8080 \
  -e MONGODB_URI='mongodb://USER:PASSWORD@HOST:PORT/DATABASE' \
  -e TWIKOO_THROTTLE=1000 \
  imaegoo/twikoo:latest
```

数据库连接串属于敏感信息，只能放在服务器环境变量或云平台密钥配置里，不要写入本仓库。

## 切换评论服务

`_config.yml` 中的 `comment.provider` 决定当前使用哪个评论系统：

```yml
comment:
  provider: twikoo
```

可选值：

- `twikoo`：当前正式方案，无 Livere 广告，数据由自己的 Twikoo 后端保存。
- `livere`：历史方案，已保留 ID，但免费版本可能注入广告。
- `disqus`：备用方案，国内访问和登录体验不稳定。

切换后需要重新构建站点：

```bash
bundle exec jekyll build
```

## 服务器恢复命令

如果服务器重启后 Twikoo 未自动恢复，可以手动检查并启动：

```bash
sudo docker start twikoo-comment
```

如果需要重建容器，先确认已有备份，再执行：

```bash
sudo docker rm -f twikoo-comment
sudo docker run -d \
  --name twikoo-comment \
  --restart unless-stopped \
  -p 127.0.0.1:18081:8080 \
  -v /opt/twikoo/data:/app/data \
  -e TWIKOO_THROTTLE=1000 \
  imaegoo/twikoo:latest
```

Nginx 仍然将 `https://comment.mcgfdata.com` 反向代理到 `127.0.0.1:18081`。

## 安全提醒

- 不要把服务器密码、数据库连接串或后台管理密码提交到仓库。
- 迁移前必须先备份 `/opt/twikoo/data`。
- GitHub Pages 页面是 HTTPS，Twikoo 后端也必须使用 HTTPS，否则浏览器会拦截请求。
- 如果更换域名，记得同步更新 `_config.yml` 的 `comment.twikoo.envId`。
