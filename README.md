# baixinpan.github.io

这是潘柏信的个人博客项目，基于 Jekyll 构建，用于发布技术文章、项目记录和个人归档。

线上地址：

```text
https://baixinpan.github.io/
```

## 项目沿革

- 原项目：[leopardpan.github.io](https://leopardpan.github.io/) 对应账号已丢失。
- 本项目在该仓库历史基础上继续迭代和优化维护。

## 当前状态

- 保留原博客的封面头像、头像翻转、点击进入文章列表等交互。
- 保留文章卡片式列表和响应式布局。
- 优化了首页、文章页、归档页、标签页、页脚和基础 SEO 信息。
- 恢复总站阅读统计、文章阅读统计、Twikoo/Livere/Disqus 评论入口和页脚社交链接。

## 目录说明

- `_posts/`：博客文章。
- `_layouts/`：页面基础模板。
- `_includes/`：可复用页面片段，例如头部、侧栏、页脚、分页。
- `css/`：站点样式。
- `docs/`：部署、运维和迁移说明。
- `js/`：站点交互脚本。
- `images/`：站点图片资源。
- `about.md`：关于页。
- `archive.html`：文章归档页。
- `tags.html`：标签页。
- `support.md`：站点说明页。

## 本地运行

首次运行需要安装依赖：

```bash
bundle install --path vendor/bundle
```

启动本地预览：

```bash
BUNDLE_PATH=vendor/bundle bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

构建静态文件：

```bash
BUNDLE_PATH=vendor/bundle bundle exec jekyll build
```

本地预览地址：

```text
http://127.0.0.1:4000/
```

## 维护说明

- 新文章放在 `_posts/` 目录，文件名使用 `YYYY-MM-DD-title.md`。
- 站点标题、描述、导航和社交信息在 `_config.yml` 中维护。
- 阅读统计、评论、百度统计、Google Analytics 也在 `_config.yml` 中维护；评论可通过 `comment.provider` 在 Twikoo、Livere、Disqus 间切换。
- 评论系统的部署、备份和迁移步骤见 `docs/comments.md`。
- 头像翻转效果来自当前项目的历史样式，后续不要随意重写该段动画。
- `vendor/`、`.bundle/`、`_site/` 都是本地生成目录，不需要提交。

## 发布

提交源码到当前仓库后，由 GitHub Pages 构建并发布到 `https://baixinpan.github.io/`。
