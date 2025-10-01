# Button 组件装饰图片使用说明

## ✅ 已完成配置

Button 组件现在使用了 `common-assets` 中的装饰图片：

- **左侧装饰**: `button1.png` (10px × 10px)
- **右侧装饰**: `button2.png` (10px × 10px)

## 🎨 效果预览

```
[button1.png] [icon] 按钮文字 [button2.png]
     ↑         ↑        ↑          ↑
   左装饰    字体图标   文本内容   右装饰
```

## 📝 组件结构

```vue
<button class="my-button">
  <span class="button-left-deco"></span>   <!-- 左侧装饰 -->
  <i v-if="icon" class="iconfont"></i>     <!-- 字体图标（可选） -->
  <slot></slot>                             <!-- 按钮文字 -->
  <span class="button-right-deco"></span>  <!-- 右侧装饰 -->
</button>
```

## 🎯 使用示例

### 基础用法

```vue
<template>
  <div>
    <!-- 所有按钮都会自动带上左右装饰图片 -->
    <my-button>普通按钮</my-button>
    <my-button icon="iconshanchu">删除按钮</my-button>
    <my-button icon="iconadd">添加按钮</my-button>
  </div>
</template>
```

### 实际效果

每个按钮都会显示为：

```
[🔹] [图标] 按钮文字 [🔹]
```

## 🔧 技术实现

### CSS 样式

```css
/* 左侧装饰图片 */
.button-left-deco {
  width: 10px;
  height: 10px;
  background-image: url("@build-compons/common-assets/images/icons/button1.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0; /* 防止被压缩 */
}

/* 右侧装饰图片 */
.button-right-deco {
  width: 10px;
  height: 10px;
  background-image: url("@build-compons/common-assets/images/icons/button2.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0; /* 防止被压缩 */
}
```

### 按钮布局

```css
.my-button {
  display: inline-flex; /* Flex 布局 */
  align-items: center; /* 垂直居中 */
  gap: 6px; /* 元素间距 */
}
```

**元素顺序**：左装饰 → 图标 → 文字 → 右装饰

## 🎨 自定义装饰样式

### 修改装饰图片大小

```vue
<template>
  <my-button class="large-deco-button">大装饰按钮</my-button>
</template>

<style>
.large-deco-button .button-left-deco,
.large-deco-button .button-right-deco {
  width: 16px;
  height: 16px;
}
</style>
```

### 隐藏装饰图片

```vue
<template>
  <my-button class="no-deco-button">无装饰按钮</my-button>
</template>

<style>
.no-deco-button .button-left-deco,
.no-deco-button .button-right-deco {
  display: none;
}
</style>
```

### 只显示一侧装饰

```vue
<template>
  <my-button class="left-only-button">只有左装饰</my-button>
</template>

<style>
.left-only-button .button-right-deco {
  display: none;
}
</style>
```

### 更换装饰图片

```vue
<style>
.custom-deco-button .button-left-deco {
  background-image: url("@build-compons/common-assets/images/icons/custom-left.png");
}

.custom-deco-button .button-right-deco {
  background-image: url("@build-compons/common-assets/images/icons/custom-right.png");
}
</style>
```

## 📊 完整的按钮组成

```
┌────────────────────────────────────────┐
│ [左装饰] [图标] 按钮文字 [右装饰]      │
│   10px    16px   文本    10px          │
│   ↓       ↓      ↓       ↓             │
│  button1  icon   slot   button2        │
│   .png   font    text    .png          │
└────────────────────────────────────────┘
```

## 🌐 查看效果

访问 http://localhost:8080，你会看到所有按钮都带有：

1. ✅ **左侧装饰图片** - button1.png (10px × 10px)
2. ✅ **中间图标**（可选）- iconfont 字体图标 (16px)
3. ✅ **按钮文字** - 插槽内容
4. ✅ **右侧装饰图片** - button2.png (10px × 10px)

## 📦 资源引用

装饰图片来自：

```
packages/common-assets/images/icons/
├── button1.png  # 左侧装饰
└── button2.png  # 右侧装饰
```

通过 `@build-compons/common-assets` 引用，支持：

- ✅ Workspace 内部引用
- ✅ 按需加载
- ✅ 构建时自动处理路径

## 💡 最佳实践

1. **保持图片小巧**: 装饰图片应该小于 20px
2. **使用 PNG 格式**: 支持透明背景
3. **优化图片**: 压缩图片以减小体积
4. **统一风格**: 确保装饰图片风格一致
5. **语义化命名**: 使用有意义的文件名

## 🔗 相关文档

- **ICON_USAGE.md** - Button 图标使用指南
- **common-assets/README.md** - 公共资源使用文档
- **common-assets/USAGE_EXAMPLES.md** - 详细使用示例

---

**🎊 现在 Button 组件拥有了左右装饰图片 + 字体图标的完整功能！**
