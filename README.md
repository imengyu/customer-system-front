# wzjyzx

> 温州教育在线前端项目

## 如何启动 前端 VUE 项目

* 先安装 NodeJs
* 用 VSCode 打开本项目
* 先打开 web\config\index.js 第 15 行，target: 'http://wzjyzx.imyzc.com/api' 这里，
* 如果你的项目在本地有添加服务器，请将 wzjyzx.imyzc.com 改为你自己本地调试路径
* 否则，你需要在自己的服务器添加一个虚拟主机，servername 填写 wzjyzx.imyzc.com（无需添加hosts因为我已将此域名解析至127.0.0.1）
，并将根目录设置为 wzjyzx/public （重要！）.关于如何添加虚拟主机你可以百度“apache添加虚拟主机”或“nginx添加虚拟主机”。
* 然后启动服务器
* 按 Ctrl + J 打开终端

``` bash

# 进入 web 目录
cd web

# 第一次启动请先安装依赖项（以后不需要运行此命令）
npm install

# 开始本地调试网站，可以用 localhost:8080 访问和测试。
npm run dev

# 编译发布版本网站，输出到 public 目录下
npm run build
```
