# 每日晨间简报 · 微信小程序 部署指南

## 项目说明

这是一个微信小程序，用于展示每日晨间简报的四个模块：
- 模块1：AGV仓储/物流新闻
- 模块2：长沙岳麓区招聘动态
- 模块3：岳麓区实验小学东校区通知
- 模块4：第十三届全国少数民族传统体育运动会征集结果

---

## 第一步：安装微信开发者工具

1. 下载地址：<ADDRESS_REMOVED>
2. 安装完成后，用你的微信扫码登录

---

## 第二步：导入小程序项目

1. 打开微信开发者工具
2. 点击「导入项目」
3. 项目目录选择：`E:\AI_project\WorkBuddy\automation-2026-07-02-15-44-15\miniprogram`
4. AppID 选择「测试号」（或填入你注册的小程序 AppID）
5. 项目名称：`每日晨间简报`

---

## 第三步：生成预览二维码

在微信开发者工具中：

1. 点击顶部工具栏的 **「预览」** 按钮
2. 会弹出一个二维码窗口
3. 用手机微信 **扫描这个二维码**
4. 即可在手机上体验小程序

> ⚠️ 注意：使用「测试号」时，只有登录开发者工具的微信账号才能扫码预览。

---

## 第四步：配置数据来源（可选）

目前小程序使用内置的示例数据运行。要接入自动化生成的真实数据：

### 方案一：部署 JSON 到可访问的 URL（推荐）

1. 在 Gitee 创建一个公开仓库，如 `morning-briefing-data`
2. 把自动化生成的 `morning_briefing_latest.json` 上传到仓库
3. 开启 Gitee Pages 服务
4. 得到固定 URL，如：`https://yourname.gitee.io/morning-briefing-data/morning_briefing_latest.json`
5. 修改 `miniprogram/app.js` 中的 `apiBaseUrl` 为上述地址

### 方案二：使用本地服务器（仅开发测试）

1. 在 `miniprogram` 目录下启动一个简单的 HTTP 服务器
2. 修改 `app.js` 中的 `apiBaseUrl` 为 `http://localhost:8000`
3. 在微信开发者工具的「设置 → 项目设置」中勾选「不校验合法域名」

---

## 第五步：正式发布（可选）

若需要正式发布到微信平台：

1. 在 [微信公众平台](https://mp.weixin.qq.com) 注册小程序账号
2. 获取正式的 AppID
3. 在 `project.config.json` 中填入 AppID
4. 在微信开发者工具中点击「上传」，提交代码审核
5. 审核通过后即可正式发布

---

## 文件结构

```
miniprogram/
├── app.js                    # 小程序入口
├── app.json                  # 全局配置
├── app.wxss                 # 全局样式
├── project.config.json       # 项目配置
├── sitemap.json             # 站点地图
├── utils/
│   └── localData.js        # 本地示例数据
├── pages/
│   ├── index/              # 首页（模块概览 + 新闻/招聘列表）
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   └── detail/             # 详情页
│       ├── detail.js
│       ├── detail.json
│       ├── detail.wxml
│       └── detail.wxss
└── sample_data.json         # 示例数据（供参考）
```

---

## 常见问题

**Q：扫码后提示「页面不存在」？**
A：检查 `app.json` 中的 `pages` 路径是否正确，确保所有页面文件存在。

**Q：网络数据无法加载？**
A：开发阶段请在微信开发者工具的「设置 → 项目设置」中勾选「不校验合法域名」。正式发布前需要在微信公众平台配置合法域名。

**Q：如何修改主题颜色？**
A：修改 `app.wxss` 中的全局样式，或各页面 `.wxss` 文件中的颜色值。`#667eea` 为主色调。
