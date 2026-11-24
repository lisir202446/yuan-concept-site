# 元概念官网（yuan-concept-official-h5）代码副本

- 拉取时间：2026-11-24
- 来源服务器：47.119.148.3，`/usr/local/yuan-concept/yuan-concept-official-h5/`
- 线上版本：**1.1.0**（服务器 env `RELEASE_DIR` 指向 `releases/1.1.0`）
- 完整性：162 个文件，`checksums.json` 28/28 通过，`SHA256SUMS` 28/28 通过，`incoming/yuan-concept-official-1.1.0.tar.gz` 结构完好

## 目录说明

| 目录 | 内容 |
|---|---|
| `releases/1.1.0/dist/` | **网站构建产物（可直接部署的静态站点）**：index.html、app.js、styles.css、assets/（图片/视频）、health、ready |
| `releases/1.1.0/runtime/static-server.mjs` | Node 静态文件服务器（容器入口） |
| `releases/1.0.0`、`1.0.1`、`1.1.0` | 三个历史发布版本 |
| `backup/` | 各次升级前的备份 |
| `deploy/docker-compose.yml` | 容器编排（只读挂载 + 资源限制 + 健康检查，符合部署规范） |
| `deploy/nginx-with-yuan-concept.conf` | 宿主机 Nginx 接入配置 |
| `deploy/preview-1.0.1.env` | 非敏感变量模板（旧版本，仅作参考） |
| `incoming/yuan-concept-official-1.1.0.tar.gz` | 1.1.0 发布包原件 |
| `logs/`、`data/` | 线上运行目录（data 为空） |

## 注意

- 这里是**构建产物（dist）**，不是前端源代码工程——没有 package.json / 源码。要做二次开发需要在开发机上从 GitLab 拉源码（`https://gitlab.zhongshianhong.net/autodeploy/yuan-concept` 或对应仓库，需运维确认），改完后构建出新的 dist 再按规范以制品形式发布。
- 首页本地预览：浏览器直接打开 `releases/1.1.0/dist/index.html` 即可看静态页面（部分功能依赖线上路径）。