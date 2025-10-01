# Common Assets 包创建完成 ✅

## 📦 创建的内容

### 目录结构

```
packages/common-assets/
├── images/              # 图片资源目录
│   ├── icons/          # 图标
│   ├── logos/          # Logo
│   ├── backgrounds/    # 背景图
│   ├── avatars/        # 头像
│   └── .gitkeep
├── fonts/              # 字体资源目录
│   └── .gitkeep
├── index.js            # 资源导出入口
├── package.json        # 包配置
├── README.md           # 使用文档
├── USAGE_EXAMPLES.md   # 详细使用示例
├── SUMMARY.md          # 本文件
└── .gitignore          # Git 忽略配置
```

## ✨ 功能特点

1. **📁 统一管理**: 所有公共图片和字体资源集中管理
2. **🔗 易于引用**: 通过 `@build-compons/common-assets` 引用
3. **🎯 Workspace 支持**: 其他包可以直接引用
4. **📝 完整文档**: 提供详细的使用说明和示例
5. **🏗️ 清晰结构**: 按类型划分的子目录结构

## 🚀 快速使用

### 在组件中引用图片

```vue
<template>
  <img src="@build-compons/common-assets/images/logos/logo.png" alt="Logo" />
</template>
```

### 在 CSS 中引用字体

```css
@font-face {
  font-family: "CustomFont";
  src: url("@build-compons/common-assets/fonts/custom.ttf");
}
```

### 在 JS 中动态引入

```javascript
import assets from "@build-compons/common-assets";

// 使用辅助函数
const logoPath = assets.getImagePath("logo.png");
const fontPath = assets.getFontPath("custom.ttf");
```

## 📚 文档说明

- **README.md**: 基础使用文档
- **USAGE_EXAMPLES.md**: 详细使用示例，包括：
  - 在组件库中使用
  - 在文档项目中使用
  - 动态引入
  - 优化技巧
  - 实际应用场景

## 🎯 适用场景

1. **品牌一致性**: 统一的 Logo、图标、字体
2. **主题切换**: 亮色/暗色模式的图片资源
3. **国际化**: 不同语言的图片资源
4. **性能优化**: 统一管理和优化资源

## 📦 在其他包中使用

### 在 components 包中

```javascript
// packages/components/src/components/Header/index.vue
import logo from "@build-compons/common-assets/images/logos/logo.png";
```

### 在 docs 包中

```javascript
// packages/docs/src/App.vue
<img src="@build-compons/common-assets/images/logo.png" />
```

## 🔧 推荐的资源规范

### 图片命名

- 图标: `icon-{name}.svg` (如: `icon-user.svg`)
- Logo: `logo-{variant}.png` (如: `logo-light.png`)
- 背景图: `bg-{description}.jpg` (如: `bg-hero.jpg`)

### 字体命名

- `{FontName}-{Weight}.{ext}` (如: `Roboto-Regular.ttf`)

### 图片格式

- **图标**: SVG（推荐）、PNG
- **照片**: JPG、WebP
- **透明图**: PNG

### 字体格式

- **推荐**: WOFF2
- **兼容**: WOFF、TTF

## 💡 最佳实践

1. ✅ 图片压缩后再上传
2. ✅ 提供多种尺寸的图片
3. ✅ 优先使用 SVG 格式图标
4. ✅ 字体使用 WOFF2 格式
5. ✅ 大图片使用懒加载
6. ✅ 遵循命名规范

## 🔗 相关链接

- [图片优化最佳实践](https://web.dev/fast/#optimize-your-images)
- [Web 字体优化指南](https://web.dev/font-best-practices/)

## ⚠️ 注意事项

1. **文件大小**: 注意控制图片大小，避免影响加载速度
2. **版权问题**: 确保使用的图片和字体有合法授权
3. **命名规范**: 遵循项目的命名规范
4. **Git 提交**: 大文件可能需要使用 Git LFS

## 🎉 下一步

1. 将你的图片和字体文件放入对应的目录
2. 在组件或文档中引用这些资源
3. 享受统一管理的便利！

---

**创建时间**: 2025-10-01  
**版本**: 0.1.0  
**状态**: ✅ 已完成
