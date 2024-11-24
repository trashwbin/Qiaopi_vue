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

**[侨缘信使🎉](http://110.41.58.26)**

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

## 未完待续

- [ ] 
- [ ] css样式冗余，应提取公共样式，减少体积
- [ ] WebSocket和AES密钥嵌在代码中，不利于维护
- [ ] 部分axios请求未使用request.js，不利于全局处理异常
- [ ] WebSocket重试机制复杂
- [ ] 项目打包仅使用Gzip暴力压缩，仍有其它配置提升首屏加载速度