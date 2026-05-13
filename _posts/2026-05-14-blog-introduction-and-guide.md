---
layout: post
title: 个人博客介绍与使用文档
date: 2026-05-14 00:00:00 +0800
description: "介绍 baixinpan.github.io 在历史博客模板基础上改版升级后的定位、主要功能、浏览方式、写作发布和维护方法。"
tags: jekyll
featured: true
---

这篇文章用于说明当前个人博客改版升级后的定位、功能和使用方式。后续如果站点结构继续调整，也可以把这里作为读者和维护者的统一入口。

当前版本是在历史博客模板基础上继续迭代而来。早期文章已经记录过博客搭建、模板功能和迭代过程，如果你想了解项目上下文，可以先看这几篇：

- [Jekyll搭建个人博客](/2016/10/jekyll_tutorials1/)：介绍如何使用 Jekyll 搭建个人博客。
- [博客模板功能介绍](/2020/07/blog_info/)：介绍旧版模板的主要功能和配置方式。
- [博客迭代记录](/2020/07/ReleaseNode/)：记录博客模板早期版本的更新历程。

本文则是基于这次新版改造后的补充说明，重点介绍当前站点新增的搜索、标签筛选、精选文章、项目页、阅读辅助和维护方式。

## 站点定位

`baixinpan.github.io` 是潘柏信的个人技术博客，用于沉淀技术文章、项目记录、工具链经验和历史教程。

这个站点延续自原来的 `leopardpan.github.io` 项目。由于原项目对应账号已丢失，当前站点在保留历史内容的基础上继续维护和迭代。

相比旧版模板，本次改版更关注三件事：

- 内容更容易被找到：增加站内搜索、搜索页、标签过滤和精选文章。
- 阅读过程更顺手：增加阅读时间、代码复制、目录高亮和返回顶部。
- 维护更清晰：补充项目页、文章摘要、RSS 摘要、SEO 信息和使用文档。

站点主要服务三类需求：

- 给读者提供可检索、可归档、可继续阅读的技术内容。
- 给自己保留长期可回看的实践记录。
- 作为 Jekyll / GitHub Pages 个人博客模板的维护示例。

## 主要功能

当前博客在旧版功能基础上做了升级，已经支持以下功能：

- 首页精选文章和最新文章列表。
- 文章卡片展示发布时间、阅读时间、摘要、标签和阅读入口。
- 独立搜索页，支持按标题、摘要和标签搜索。
- 搜索结果按相关度排序，标题命中优先，其次是标签和摘要。
- 搜索页支持通过 URL 分享，例如 `/search/?q=jekyll`。
- 标签页支持按标签筛选文章。
- 文章页支持目录、代码高亮、代码复制、上一篇/下一篇、评论和同主题标签入口。
- 移动端适配，顶部导航和主要按钮满足触控尺寸。
- RSS、SEO、Open Graph 分享信息和 sitemap。
- 访问统计与评论系统。
- 项目页，用于整理个人项目和长期维护入口。

## 如何浏览内容

如果你熟悉旧版博客，可以把新版理解为“文章列表 + 标签 + 搜索 + 项目入口”的组合。旧版更多依赖首页和归档浏览，新版则更适合按关键词或主题快速定位内容。

### 首页

首页包含两个主要区域：

- 精选文章：适合快速了解站点中更值得优先阅读的内容。
- 最新文章：按发布时间倒序展示全部文章。

如果你是第一次访问，可以先看精选文章；如果你知道自己要找什么，可以直接使用搜索框。

精选文章通常会放置长期仍有参考价值的文章，例如博客搭建、模板说明和站点维护相关内容。

### 搜索

搜索页地址：

```text
/search/
```

搜索支持标题、摘要和标签匹配。搜索结果会按相关度排序：

- 标题命中优先级最高。
- 标签命中其次。
- 摘要命中再次。

搜索页也支持带关键词打开：

```text
/search/?q=hexo
/search/?q=jekyll
/search/?q=markdown
```

在搜索框中按回车，可以直接打开第一条结果。

如果你是从历史文章过来的，例如想找 Hexo 或 Jekyll 相关内容，推荐直接搜索：

```text
hexo
jekyll
markdown
```

### 标签

标签页地址：

```text
/tags/
```

点击文章卡片或文章页中的标签，会进入标签页并只展示同标签文章。例如：

```text
/tags#jekyll
/tags#hexo
```

标签页会显示当前筛选状态和该标签下的文章数量。

这相当于旧版“标签分类”的增强版：不仅能看到所有标签，也能从任意文章直接跳到同主题文章列表。

### 归档

归档页地址：

```text
/archive/
```

归档页按年份整理所有文章，适合快速回看历史内容。

### 项目

项目页地址：

```text
/projects/
```

这里用于集中放置 GitHub、博客模板维护入口和项目相关内容。

## 文章页说明

文章页包含以下信息：

- 标题。
- 发布时间。
- 阅读时间。
- 阅读统计。
- 标签。
- 文章目录。
- 正文内容。
- 代码块复制按钮。
- 底部同主题标签。
- 上一篇 / 下一篇。
- 评论区。

对于较早发布的文章，请结合发布时间判断内容是否仍然适用。技术工具链变化很快，旧文章更适合作为思路参考。

## 本地运行

本项目仍然基于 Jekyll 和 GitHub Pages，运行方式与历史文章 [Jekyll搭建个人博客](/2016/10/jekyll_tutorials1/) 中介绍的思路一致，只是当前项目已经包含完整模板、样式和交互脚本，不需要从零创建 Jekyll 项目。

首次运行需要安装依赖：

```bash
bundle install --path vendor/bundle
```

启动本地预览：

```bash
BUNDLE_PATH=vendor/bundle bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

本地访问地址：

```text
http://127.0.0.1:4000/
```

构建静态文件：

```bash
BUNDLE_PATH=vendor/bundle bundle exec jekyll build
```

如果本地 Ruby 依赖较旧，可能会遇到 `ffi`、`public_suffix` 等 gem 安装问题。可以优先参考 `README.md` 中的说明，或使用 GitHub Pages 的线上构建作为最终发布环境。

## 从零部署到 GitHub Pages

如果你想基于这个博客模板搭建自己的个人博客，可以按下面这条完整链路操作。

### 1. 准备 GitHub 账号

先准备一个 GitHub 账号。假设你的 GitHub 用户名是：

```text
yourname
```

你的 GitHub Pages 个人站仓库名应当是：

```text
yourname.github.io
```

GitHub Pages 会把这个仓库发布到：

```text
https://yourname.github.io/
```

### 2. 创建个人站仓库

在 GitHub 新建仓库：

```text
yourname.github.io
```

建议设置为 Public。个人 GitHub Pages 通常使用公开仓库最简单。

### 3. 获取博客模板代码

如果你是基于当前项目继续改，可以把代码下载到本地：

```bash
git clone https://github.com/baixinpan/baixinpan.github.io.git
```

进入目录：

```bash
cd baixinpan.github.io
```

然后把远程仓库地址改成你自己的仓库：

```bash
git remote set-url origin https://github.com/yourname/yourname.github.io.git
```

也可以直接下载 ZIP，解压后再初始化 Git：

```bash
git init
git remote add origin https://github.com/yourname/yourname.github.io.git
```

### 4. 修改站点配置

主要修改 `_config.yml`。

至少需要改这些字段：

```yaml
title: 你的名字
subtitle: 个人站
description: 欢迎来到我的个人站
url: "https://yourname.github.io"
baseurl: ""
```

再根据需要修改：

```yaml
avatarTitle: yourname
avatarDesc: 你的方向
social:
  github: yourname
  mail: your-email@example.com
```

如果你暂时不想开启评论、统计，也可以先关闭：

```yaml
enableBusuanzi: false
comment:
  provider:
```

### 5. 替换头像和封面

常用图片路径：

```text
images/avatar.jpg
images/background-cover.jpg
images/favicon.png
```

保持文件名不变最省事。如果换成其它文件名，需要同步修改 `_config.yml` 中的：

```yaml
cover_image: /images/background-cover.jpg
avatar_image: /images/avatar.jpg
```

### 6. 写第一篇文章

在 `_posts/` 下创建文章：

```text
2026-05-14-my-first-post.md
```

示例内容：

```markdown
---
layout: post
title: 我的第一篇文章
date: 2026-05-14 00:00:00 +0800
description: "记录我的第一篇博客文章。"
tags: blog
featured: true
---

这是我的第一篇文章。
```

注意：

- 文件名必须是 `YYYY-MM-DD-title.md`。
- `date` 建议写完整时区，例如 `2026-05-14 00:00:00 +0800`。
- `description` 会用于首页摘要、搜索结果、RSS 和 SEO。
- `featured: true` 会让文章进入首页精选。

### 7. 本地预览

安装依赖：

```bash
bundle install --path vendor/bundle
```

启动预览：

```bash
BUNDLE_PATH=vendor/bundle bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

打开：

```text
http://127.0.0.1:4000/
```

本地重点检查：

- 首页是否显示你的文章。
- 搜索页能否搜索到文章。
- 标签页是否能按 tag 过滤。
- 文章页目录、代码块和评论区是否正常。

### 8. 提交代码

确认无误后提交：

```bash
git add .
git commit -m "init personal blog"
git push -u origin master
```

如果你的仓库默认分支是 `main`，则使用：

```bash
git push -u origin main
```

### 9. 开启 GitHub Pages

进入 GitHub 仓库页面：

```text
Settings → Pages
```

选择发布源：

```text
Deploy from a branch
```

分支选择：

```text
master 或 main
```

目录选择：

```text
/(root)
```

保存后等待 GitHub Pages 构建完成。

### 10. 访问线上站点

构建完成后访问：

```text
https://yourname.github.io/
```

如果页面没有立刻出现，可以等几分钟再刷新。GitHub Pages 第一次发布通常需要一点时间。

### 11. 后续更新流程

以后每次更新文章或配置，流程都是：

```bash
git add .
git commit -m "update blog"
git push
```

GitHub Pages 会自动重新构建并发布。

完整链路可以概括为：

```text
创建 yourname.github.io 仓库
→ 放入博客模板代码
→ 修改 _config.yml
→ 写文章到 _posts
→ 本地预览
→ git push
→ GitHub Pages 自动发布
→ 访问 https://yourname.github.io/
```

## 写一篇新文章

写文章的方式延续旧版模板：把 Markdown 文件放到 `_posts/`，通过 front matter 声明标题、日期、标签等信息。

新文章放在 `_posts/` 目录下，文件名格式为：

```text
YYYY-MM-DD-title.md
```

例如：

```text
2026-05-14-blog-introduction-and-guide.md
```

文章头部使用 front matter：

```yaml
---
layout: post
title: 文章标题
date: 2026-05-14
description: "文章摘要，用于搜索结果、SEO 和 RSS。"
tags: jekyll
---
```

常用字段说明：

- `layout`：文章页面使用 `post`。
- `title`：文章标题。
- `date`：发布时间。
- `description`：文章摘要，建议每篇都填写。
- `tags`：文章标签，可用于标签页和搜索。
- `featured`：设置为 `true` 后会进入首页精选文章。
- `image`：文章分享图；不填时使用站点默认封面。

建议新文章尽量填写 `description`。新版搜索、RSS、SEO 和文章卡片都会优先使用它，这比直接截取正文更清晰。

## 配置站点信息

旧版模板主要通过 `_config.yml` 管理站点信息，新版仍然保留这个方式。日常维护优先修改 `_config.yml` 和 `_posts/`，这样更容易升级模板。

站点配置集中在 `_config.yml`。

常用配置包括：

- `title`：站点标题。
- `subtitle`：站点副标题。
- `description`：站点描述。
- `cover_image`：封面图。
- `avatar_image`：头像。
- `nav`：导航菜单。
- `social`：社交链接。
- `comment`：评论系统。
- `enableToc`：是否开启文章目录。
- `enableBusuanzi`：是否开启访问统计。

如果只是日常维护，通常只需要修改 `_posts/` 和 `_config.yml`。

如果你想添加新导航页面，可以参考当前的 `projects.md`、`about.md` 和 `support.md`，然后在 `_config.yml` 的 `nav` 中增加入口。

当前站点底部只展示已配置的社交入口。模板仍然支持微博、简书、知乎、掘金、Twitter 等链接；如果某个平台不想展示，保持对应字段为空即可。例如当前微博字段为空，底部就不会显示微博入口：

```yaml
social:
  github: baixinpan
  mail: leopardpan@icloud.com
  weibo:
```

## 评论与统计

当前站点支持评论和访问统计。

评论系统配置在 `_config.yml`：

```yaml
comment:
  provider: twikoo
```

访问统计通过 Busuanzi 加载。如果第三方服务加载失败，页面会自动隐藏残缺统计文本，避免影响阅读。

## RSS 与订阅

RSS 地址：

```text
/feed.xml
```

RSS 会输出文章标题、摘要、发布时间、链接和分类信息。文章摘要优先使用 `description` 字段，因此建议每篇文章都补充清晰的 `description`。

## 发布方式

提交源码到 GitHub 仓库后，由 GitHub Pages 构建并发布到：

```text
https://baixinpan.github.io/
```

发布前建议检查：

- 本地构建是否通过。
- 首页、文章页、搜索页、标签页、项目页是否正常。
- 新文章是否有标题、日期、摘要和标签。
- 外链是否带有 `https://`。
- 图片路径是否正确。

## 维护建议

后续维护可以遵循以下原则：

- 新文章优先补 `description`，提高搜索和 RSS 质量。
- 旧文章不强行重写，但可以逐步修正失效链接。
- 重要文章可加 `featured: true`，进入首页精选。
- 项目、工具和长期入口放到项目页集中维护。
- 大的 UI 改动尽量保持当前站点的个人气质和阅读优先原则。
- 如果后续继续升级模板，建议同步更新本文，避免使用说明和实际站点脱节。

## 目录结构

常用目录说明：

```text
_posts/       博客文章
_layouts/     页面布局
_includes/    可复用页面片段
css/          样式文件
js/           前端交互脚本
images/       图片资源
docs/         文档和维护说明
```

重要页面：

```text
index.html    首页
archive.html  归档页
tags.html     标签页
search.html   搜索页
projects.md   项目页
about.md      关于页
support.md    说明页
```

## 总结

这个博客现在不仅是一个文章展示站，也是一套轻量的个人知识归档系统。它保留了早期博客的历史内容，同时补充了搜索、标签筛选、精选文章、项目入口、阅读辅助和移动端体验。

如果你之前看过旧版模板，可以把当前版本理解为一次面向“可检索、可阅读、可维护”的升级：基础仍然是 Jekyll 和 GitHub Pages，但读者找文章、读文章，维护者写文章、整理文章，都会比旧版更直接。

后续只要持续补充高质量文章、维护标签和摘要，这个站点就可以长期作为个人技术资产库使用。
