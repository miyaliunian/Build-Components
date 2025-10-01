# @build-compons/common-assets

公共资源包，用于存放和管理项目中的公共图片、字体等静态资源。

## 📁 目录结构

```
common-assets/
├── images/          # 图片资源
│   ├── icons/       # 图标
│   ├── logos/       # Logo
│   └── backgrounds/ # 背景图
├── fonts/           # 字体资源
├── index.js         # 导出入口
├── package.json
└── README.md
```

## 🎯 使用方式

### 方式一：在组件中引用图片

```vue
<template>
  <div>
    <img src="@build-compons/common-assets/images/logo.png" alt="Logo" />
  </div>
</template>
```

### 方式二：在 CSS 中引用

```css
.background {
  background-image: url("@build-compons/common-assets/images/bg.jpg");
}

@font-face {
  font-family: "CustomFont";
  src: url("@build-compons/common-assets/fonts/custom.ttf");
}
```

### 方式三：通过 JS 引入

```javascript
// 引入整个资源包
import assets from "@build-compons/common-assets";

// 使用辅助函数获取路径
const logoPath = assets.getImagePath("logo.png");
const fontPath = assets.getFontPath("custom.ttf");

// 或者直接 require
const logo = require("@build-compons/common-assets/images/logo.png");
```

## 📦 在 Workspace 中使用

由于使用了 pnpm workspace，其他包可以直接引用：

### 在 components 包中使用

```vue
<!-- packages/components/src/components/Header/index.vue -->
<template>
  <div class="header">
    <img :src="logo" alt="Logo" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: require("@build-compons/common-assets/images/logo.png"),
    };
  },
};
</script>
```

### 在 docs 包中使用

```vue
<!-- packages/docs/src/App.vue -->
<template>
  <div id="app">
    <img src="@build-compons/common-assets/images/logo.png" />
  </div>
</template>
```

## 📝 资源命名规范

### 图片命名

- **图标**: `icon-{name}.png` 或 `icon-{name}.svg`

  - 示例: `icon-user.svg`, `icon-settings.png`

- **Logo**: `logo-{variant}.png`

  - 示例: `logo-light.png`, `logo-dark.png`

- **背景图**: `bg-{description}.jpg`
  - 示例: `bg-hero.jpg`, `bg-pattern.png`

### 字体命名

- `{FontName}-{Weight}.{ext}`
  - 示例: `Roboto-Regular.ttf`, `OpenSans-Bold.woff2`

## 🎨 推荐的资源格式

### 图片格式

- **图标**: SVG（推荐）、PNG
- **照片**: JPG、WebP
- **透明图**: PNG
- **动画**: GIF、WebP

### 字体格式

- **现代浏览器**: WOFF2（推荐）
- **兼容性**: WOFF, TTF
- **SVG 字体**: 不推荐（已废弃）

## 🔧 Webpack 配置

如果需要在项目中正确处理这些资源，确保 Webpack 配置了相应的 loader：

```javascript
// vue.config.js 或 webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
```

## 📊 优化建议

### 图片优化

1. **压缩图片**: 使用工具如 TinyPNG、ImageOptim
2. **响应式图片**: 提供多种尺寸
3. **懒加载**: 对大图片使用懒加载
4. **WebP 格式**: 提供 WebP 版本以减小体积

### 字体优化

1. **子集化**: 只包含需要的字符
2. **使用 WOFF2**: 更好的压缩率
3. **字体加载策略**: 使用 `font-display: swap`

## 📦 发布到 npm

由于是 workspace 包，通常不单独发布，而是作为 monorepo 的一部分。

如果需要单独发布：

```bash
cd packages/common-assets
npm publish
```

## 🔗 相关链接

- [Web 字体优化指南](https://web.dev/font-best-practices/)
- [图片优化最佳实践](https://web.dev/fast/#optimize-your-images)

## 📄 License

ISC
