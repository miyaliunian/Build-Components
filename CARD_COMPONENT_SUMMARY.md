# Card 组件创建完成总结

## ✅ 创建完成

成功创建了 Card（卡片）组件，演示了在 `<template>` 中引入图片的方式。

---

## 🎯 核心特点

### 图片引入方式对比

| 组件       | 引入方式 | 代码位置     | 实现方式                     |
| ---------- | -------- | ------------ | ---------------------------- |
| **Button** | CSS      | `<style>`    | `background-image: url(...)` |
| **Card**   | Template | `<template>` | `<img src="..." />`          |

### Button 组件（CSS 方式）

```vue
<style>
.button-left-deco {
  background-image: url("@build-compons/common-assets/images/icons/button1.png");
  width: 10px;
  height: 10px;
}
</style>
```

### Card 组件（Template 方式）

```vue
<template>
  <div class="card-header">
    <img
      class="card-icon"
      src="@build-compons/common-assets/images/icons/button1.png"
      alt="icon"
    />
  </div>
</template>
```

---

## 📦 创建的文件

### 组件文件

```
packages/components/src/components/Card/
├── index.vue      # Card 组件实现
└── index.js       # 组件入口（带 install 方法）
```

### 文档文件

```
packages/components/
└── CARD_USAGE.md  # Card 组件使用指南
```

### 更新的文件

```
packages/components/src/index.js      # 导出 Card 组件
packages/docs/src/App.vue             # 演示 Card 组件
```

---

## 🎨 Card 组件功能

### 基础功能

- ✅ **标题区域** - 支持 title prop
- ✅ **内容区域** - 默认插槽
- ✅ **底部区域** - footer 插槽
- ✅ **头部图标** - button1.png 自动显示

### 插槽支持

- ✅ **默认插槽** - 卡片内容
- ✅ **header 插槽** - 自定义头部
- ✅ **footer 插槽** - 自定义底部

### Props

```javascript
{
  title: {
    type: String,
    default: ""  // 卡片标题
  }
}
```

---

## 📊 构建分析

### 新的打包数据

| 组件           | JS 大小 | CSS 大小 | 总大小      |
| -------------- | ------- | -------- | ----------- |
| **Card（新）** | 2.13 KB | 0.79 KB  | **2.92 KB** |
| Button         | 1.07 KB | 2.63 KB  | 3.70 KB     |
| Dialog         | 1.46 KB | 0.79 KB  | 2.25 KB     |
| 主入口         | 4.06 KB | 4.20 KB  | 8.26 KB     |

### 按需加载效果

| 场景          | 按需引入 | 全量引入 | 节省         |
| ------------- | -------- | -------- | ------------ |
| 只用 Card     | 2.92 KB  | 8.26 KB  | **64.6%** 📉 |
| 只用 Button   | 3.70 KB  | 8.26 KB  | **55.2%** 📉 |
| Button + Card | 6.62 KB  | 8.26 KB  | **19.9%** 📉 |
| 全部组件      | 8.87 KB  | 8.26 KB  | -7.4%        |

**结论**：

- ✅ 使用 1-2 个组件，按需引入节省 **50%+** 体积
- ✅ 使用所有组件，推荐全量引入

---

## 🔧 技术实现

### Webpack 配置更新

添加了图片和字体文件的处理规则：

```javascript
{
  test: /\.(png|jpe?g|gif|svg)$/i,
  type: "asset/resource",
  generator: {
    filename: "[hash][ext][query]",
  },
},
{
  test: /\.(woff2?|eot|ttf|otf)$/i,
  type: "asset/resource",
  generator: {
    filename: "[hash][ext][query]",
  },
}
```

**作用**：

- ✅ 自动处理图片文件
- ✅ 自动处理字体文件
- ✅ 生成 hash 文件名
- ✅ 复制到构建目录

---

## 🎯 使用示例

### 基础用法

```vue
<my-card title="卡片标题">
  <p>卡片内容</p>
</my-card>
```

### 带底部操作

```vue
<my-card title="用户信息">
  <p>姓名：张三</p>
  <p>邮箱：zhangsan@example.com</p>
  <template #footer>
    <my-button icon="icondianhua">联系</my-button>
  </template>
</my-card>
```

### 自定义头部

```vue
<my-card>
  <template #header>
    <div style="display: flex; justify-content: space-between;">
      <span>自定义标题</span>
      <my-button icon="iconmore">更多</my-button>
    </div>
  </template>
  <p>内容</p>
</my-card>
```

---

## 🌐 查看效果

访问 **http://localhost:8080**，你会看到：

### Card 组件区域

1. ✅ **卡片 1** - 基础卡片，标题 + 内容
2. ✅ **卡片 2** - 带底部操作按钮
3. ✅ **卡片 3** - 自定义头部内容

### 图片显示

- ✅ 每个卡片头部都有 **button1.png 图标**（20px × 20px）
- ✅ 图标在标题左侧，自动对齐
- ✅ 图片通过 `<img>` 标签在 template 中引入

---

## 📚 完整项目组件列表

| 组件         | 功能       | 图片引用方式         |
| ------------ | ---------- | -------------------- |
| **MyButton** | 按钮组件   | CSS（左右装饰）      |
| **MyCard**   | 卡片组件   | Template（头部图标） |
| **MyDialog** | 对话框组件 | -                    |

---

## 🎉 两种图片引入方式对比

### 方式 1: CSS 引入（Button 组件）

**优点**：

- ✅ 适合装饰性图片
- ✅ 可以使用 background 属性控制
- ✅ 不占用 DOM 节点

**缺点**：

- ❌ 不支持 alt 属性
- ❌ 不利于 SEO
- ❌ 不便于动态切换

**代码示例**：

```css
.button-left-deco {
  background-image: url("@build-compons/common-assets/images/icons/button1.png");
}
```

### 方式 2: Template 引入（Card 组件）

**优点**：

- ✅ 支持 alt 属性（利于 SEO）
- ✅ 便于动态切换图片
- ✅ 图片是内容的一部分
- ✅ 更语义化

**缺点**：

- ❌ 占用 DOM 节点
- ❌ 需要额外的 HTML 标签

**代码示例**：

```vue
<img src="@build-compons/common-assets/images/icons/button1.png" alt="icon" />
```

---

## 💡 使用建议

### 何时使用 CSS 方式

- 装饰性图片（如 Button 的左右装饰）
- 背景图
- 不需要 alt 属性
- 不需要动态切换

### 何时使用 Template 方式

- 内容图片（如 Card 的头部图标）
- 需要 alt 属性
- 需要动态切换
- 利于 SEO

---

## 🚀 项目现状

### 组件总数：3 个

- ✅ MyButton - 按钮组件（带图标 + 左右装饰）
- ✅ MyCard - 卡片组件（带头部图标）
- ✅ MyDialog - 对话框组件

### 打包体积

- 📦 全量引入：8.26 KB
- 📦 单组件按需：2.25 - 3.70 KB
- 📉 优化效果：最高 64.6%

### 资源文件

- 🎨 iconfont 图标：27 个
- 📸 装饰图片：2 张（button1.png, button2.png）
- 🔤 字体文件：3 个格式（woff2, woff, ttf）

---

## 📚 相关文档

- **CARD_USAGE.md** - Card 组件使用指南（本次创建）
- **BUTTON_DECORATION.md** - Button 组件装饰说明
- **ICON_USAGE.md** - 图标使用指南
- **FINAL_SUMMARY.md** - 完整项目总结

---

**🎊 访问 http://localhost:8080 查看 Card 组件效果！**

你会看到 3 个精美的卡片，每个卡片头部都有 button1.png 图标！
