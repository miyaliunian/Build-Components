# Card 组件使用指南

## ✅ 组件说明

Card（卡片）组件是一个通用的内容容器组件，支持标题、内容和底部区域。

**特点**：

- ✅ 在 `<template>` 中使用 `<img>` 标签引入图片
- ✅ 支持标题、内容、底部三个区域
- ✅ 支持插槽自定义
- ✅ 卡片头部自动显示 button1.png 图标

---

## 🎯 基础用法

### 最简单的用法

```vue
<template>
  <my-card title="卡片标题">
    <p>这是卡片的内容区域。</p>
  </my-card>
</template>

<script>
import { MyCard } from "@build-compons/components";

export default {
  components: { MyCard },
};
</script>
```

**效果**：

```
┌────────────────────────────────┐
│ [📷] 卡片标题                  │ ← 头部（带 button1.png）
├────────────────────────────────┤
│ 这是卡片的内容区域。           │ ← 内容区
└────────────────────────────────┘
```

---

## 📝 组件 Props

### title

- **类型**: `String`
- **默认值**: `""`
- **说明**: 卡片标题，会自动显示在头部，并在左侧显示 button1.png 图标

**示例**：

```vue
<my-card title="用户信息">
  <p>用户详细信息...</p>
</my-card>
```

---

## 🎨 插槽（Slots）

### 默认插槽

卡片的主要内容区域。

```vue
<my-card title="内容卡片">
  <p>这是默认插槽内容。</p>
  <p>可以放置任何内容。</p>
</my-card>
```

### header 插槽

自定义卡片头部内容。

```vue
<my-card>
  <template #header>
    <div style="display: flex; justify-content: space-between;">
      <span>自定义标题</span>
      <my-button icon="iconmore">更多</my-button>
    </div>
  </template>
  <p>卡片内容</p>
</my-card>
```

**注意**：使用 header 插槽时，button1.png 图标仍会显示在最左侧。

### footer 插槽

自定义卡片底部内容。

```vue
<my-card title="操作卡片">
  <p>卡片内容</p>
  <template #footer>
    <div style="text-align: right;">
      <my-button icon="iconduihao">确认</my-button>
      <my-button icon="iconguanbi">取消</my-button>
    </div>
  </template>
</my-card>
```

---

## 📋 完整示例

### 示例 1: 用户信息卡片

```vue
<template>
  <my-card title="用户信息">
    <div class="user-info">
      <p><strong>姓名：</strong>张三</p>
      <p><strong>邮箱：</strong>zhangsan@example.com</p>
      <p><strong>电话：</strong>138****8888</p>
    </div>
    <template #footer>
      <my-button icon="icondianhua">联系</my-button>
    </template>
  </my-card>
</template>

<style>
.user-info p {
  margin: 8px 0;
}
</style>
```

### 示例 2: 产品卡片列表

```vue
<template>
  <div class="product-list">
    <my-card
      v-for="product in products"
      :key="product.id"
      :title="product.name"
    >
      <p>价格：¥{{ product.price }}</p>
      <p>库存：{{ product.stock }} 件</p>
      <template #footer>
        <my-button icon="iconadd">加入购物车</my-button>
      </template>
    </my-card>
  </div>
</template>

<script>
import { MyCard, MyButton } from "@build-compons/components";

export default {
  components: { MyCard, MyButton },
  data() {
    return {
      products: [
        { id: 1, name: "商品 A", price: 99, stock: 100 },
        { id: 2, name: "商品 B", price: 199, stock: 50 },
        { id: 3, name: "商品 C", price: 299, stock: 30 },
      ],
    };
  },
};
</script>

<style>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
</style>
```

### 示例 3: 统计卡片

```vue
<template>
  <div class="stats-cards">
    <my-card title="总销售额">
      <div class="stat-value">¥ 128,456</div>
      <div class="stat-label">较昨日 +12.5%</div>
    </my-card>

    <my-card title="订单数量">
      <div class="stat-value">1,234</div>
      <div class="stat-label">较昨日 +8.2%</div>
    </my-card>

    <my-card title="用户数量">
      <div class="stat-value">8,765</div>
      <div class="stat-label">较昨日 +3.1%</div>
    </my-card>
  </div>
</template>

<style>
.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #42b983;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}
</style>
```

---

## 🎨 样式定制

### 修改卡片背景

```vue
<my-card title="自定义背景" class="custom-bg-card">
  <p>内容</p>
</my-card>

<style>
.custom-bg-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.custom-bg-card .card-title {
  color: white;
}
</style>
```

### 修改卡片圆角

```vue
<my-card title="大圆角卡片" class="round-card">
  <p>内容</p>
</my-card>

<style>
.round-card {
  border-radius: 16px;
}
</style>
```

### 修改图标大小

```vue
<my-card title="大图标卡片" class="large-icon-card">
  <p>内容</p>
</my-card>

<style>
.large-icon-card .card-icon {
  width: 32px;
  height: 32px;
}
</style>
```

---

## 🔍 技术实现

### 在 Template 中引入图片

```vue
<template>
  <div class="card-header">
    <!-- ✅ 在 template 中使用 img 标签引入图片 -->
    <img
      class="card-icon"
      src="@build-compons/common-assets/images/icons/button1.png"
      alt="icon"
    />
    <span class="card-title">{{ title }}</span>
  </div>
</template>
```

**关键点**：

- ✅ 使用 `<img>` 标签
- ✅ `src` 属性直接引用 `@build-compons/common-assets` 路径
- ✅ Webpack 会自动处理图片，生成 hash 文件名
- ✅ 图片会被复制到构建目录

### 与 Button 组件的区别

| 组件       | 引入方式 | 实现方式                     |
| ---------- | -------- | ---------------------------- |
| **Button** | CSS      | `background-image: url(...)` |
| **Card**   | Template | `<img src="..." />`          |

**Button 组件**（CSS 方式）：

```css
.button-left-deco {
  background-image: url("@build-compons/common-assets/images/icons/button1.png");
}
```

**Card 组件**（Template 方式）：

```vue
<img src="@build-compons/common-assets/images/icons/button1.png" />
```

---

## 📦 构建产物

Card 组件构建后的目录：

```
lib/card/
├── index.js              # Card 组件代码（2.18 KB）
├── style.css             # Card 样式（0.81 KB）
└── 39b1c23027f8d651a316.png  # button1.png（打包后）
```

**说明**：

- 图片文件被自动打包到 card 目录
- 文件名使用 hash 值，利于缓存
- 在代码中会自动引用正确的路径

---

## 🌐 查看效果

访问 http://localhost:8080，你会看到：

1. ✅ **3 个 Card 卡片**
2. ✅ 每个卡片头部都有 **button1.png 图标**
3. ✅ 图片通过 `<img>` 标签在 template 中引入
4. ✅ 卡片样式美观，带阴影和悬停效果

---

## 💡 使用建议

### 何时使用 Template 引入（`<img>`）

✅ **适合**：

- 需要动态切换图片
- 需要设置 alt 属性
- 图片是内容的一部分
- 需要图片的原始尺寸

### 何时使用 CSS 引入（`background-image`）

✅ **适合**：

- 装饰性图片
- 需要图片平铺或定位
- 图片作为背景
- 不需要 alt 属性

---

## 🚀 扩展功能

### 添加更多图片

```vue
<template>
  <div class="my-card">
    <div class="card-header">
      <!-- 引入不同的图片 -->
      <img :src="headerIcon" alt="icon" />
      <span>{{ title }}</span>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    iconType: {
      type: String,
      default: "button1", // button1 或 button2
    },
  },
  computed: {
    headerIcon() {
      return require(`@build-compons/common-assets/images/icons/${this.iconType}.png`);
    },
  },
};
</script>
```

### 响应式图片

```vue
<template>
  <picture>
    <source
      media="(max-width: 768px)"
      :srcset="require('@build-compons/common-assets/images/icons/button1.png')"
    />
    <img
      :src="require('@build-compons/common-assets/images/icons/button2.png')"
      alt="icon"
    />
  </picture>
</template>
```

---

## 📚 相关文档

- **BUTTON_DECORATION.md** - Button 组件的装饰图片（CSS 方式）
- **common-assets/README.md** - 公共资源使用文档
- **common-assets/USAGE_EXAMPLES.md** - 资源使用示例

---

## 🎉 总结

Card 组件演示了如何在 `<template>` 中引入图片：

- ✅ 使用 `<img>` 标签
- ✅ src 属性直接引用 `@build-compons/common-assets` 路径
- ✅ Webpack 自动处理图片打包
- ✅ 支持动态引入和切换

**访问 http://localhost:8080 查看效果！**
