# 使用指南

## 📦 构建产物说明

构建完成后，会生成以下目录结构：

```
lib/
├── index.js          # 主入口文件（包含所有组件）
├── style.css         # 全局样式文件
├── button/           # Button 组件
│   ├── index.js      # Button 组件代码
│   └── style.css     # Button 样式
└── dialog/           # Dialog 组件
    ├── index.js      # Dialog 组件代码
    └── style.css     # Dialog 样式

es/                   # ES Module 格式的源文件（用于 Tree Shaking）
└── ...
```

## 🎯 三种引入方式对比

### 方式一：按需引入（推荐 ⭐⭐⭐⭐⭐）

**优点**: 打包体积最小，只打包使用的组件  
**缺点**: 需要手动引入样式

```javascript
// 只引入需要的组件
import MyButton from "@build-compons/components/lib/button";
import MyDialog from "@build-compons/components/lib/dialog";

// 引入对应的样式
import "@build-compons/components/lib/button/style.css";
import "@build-compons/components/lib/dialog/style.css";

export default {
  components: {
    MyButton,
    MyDialog,
  },
};
```

**打包结果**:

- ✅ 只包含 Button 和 Dialog 组件代码
- ✅ 只包含 Button 和 Dialog 的样式
- ❌ 其他未使用的组件不会被打包

### 方式二：使用 babel-plugin-import（最佳实践 ⭐⭐⭐⭐⭐）

**优点**: 自动按需引入，代码简洁，打包体积小  
**缺点**: 需要配置 Babel 插件

#### 第一步：安装插件

```bash
npm install babel-plugin-import -D
# 或
pnpm add babel-plugin-import -D
```

#### 第二步：配置 Babel

在 `babel.config.js` 中添加：

```javascript
module.exports = {
  plugins: [
    [
      "import",
      {
        libraryName: "@build-compons/components",
        libraryDirectory: "lib",
        style: true, // 自动引入样式
      },
      "@build-compons/components",
    ],
  ],
};
```

#### 第三步：使用组件

```javascript
// 这样写
import { MyButton, MyDialog } from "@build-compons/components";

// 插件会自动转换为：
// import MyButton from '@build-compons/components/lib/button';
// import '@build-compons/components/lib/button/style.css';
// import MyDialog from '@build-compons/components/lib/dialog';
// import '@build-compons/components/lib/dialog/style.css';

export default {
  components: {
    MyButton,
    MyDialog,
  },
};
```

**打包结果**: 同方式一，但代码更简洁

### 方式三：全量引入（不推荐 ⭐）

**优点**: 使用简单，不需要重复引入  
**缺点**: 会打包所有组件，体积大

```javascript
import MyComponents from "@build-compons/components";
import "@build-compons/components/lib/style.css";

// 全局注册所有组件
Vue.use(MyComponents);

// 之后可以直接使用，无需再注册
// <my-button>按钮</my-button>
```

**打包结果**:

- ❌ 包含所有组件代码（即使没用到）
- ❌ 包含所有组件样式
- ❌ 打包体积大

## 📊 体积对比示例

假设你只需要使用 Button 组件：

| 引入方式 | JavaScript 大小 | CSS 大小 | 总大小 |
| -------- | --------------- | -------- | ------ |
| 按需引入 | ~4KB            | ~0.5KB   | ~4.5KB |
| 全量引入 | ~8KB            | ~2KB     | ~10KB  |

**节省体积**: 约 55% 📉

## 🔧 在不同项目中使用

### Vue CLI 项目

```javascript
// main.js 或组件中
import MyButton from "@build-compons/components/lib/button";
import "@build-compons/components/lib/button/style.css";

Vue.component("MyButton", MyButton);
```

### Vite 项目

```javascript
// 完全支持，使用方式相同
import MyButton from "@build-compons/components/lib/button";
import "@build-compons/components/lib/button/style.css";
```

### Webpack 项目

```javascript
// 支持 Tree Shaking，未使用的组件会被自动移除
import { MyButton, MyDialog } from "@build-compons/components";
```

## 🎨 样式处理

### 单独引入样式

```javascript
// 方式一：在 JS 中引入
import '@build-compons/components/lib/button/style.css';

// 方式二：在 CSS 中引入
@import '@build-compons/components/lib/button/style.css';

// 方式三：在 HTML 中引入
<link rel="stylesheet" href="@build-compons/components/lib/button/style.css">
```

### 自定义主题

可以覆盖组件的 CSS 变量或类名：

```css
/* 覆盖 Button 样式 */
.my-button {
  background-color: #ff6b6b !important;
}
```

## 📝 完整示例

### 示例 1: 创建一个简单的页面

```vue
<template>
  <div class="page">
    <my-button @click.native="openDialog">打开对话框</my-button>
    <my-dialog :visible.sync="dialogVisible" title="提示">
      <p>这是对话框内容</p>
    </my-dialog>
  </div>
</template>

<script>
// 按需引入
import MyButton from "@build-compons/components/lib/button";
import MyDialog from "@build-compons/components/lib/dialog";
import "@build-compons/components/lib/button/style.css";
import "@build-compons/components/lib/dialog/style.css";

export default {
  components: {
    MyButton,
    MyDialog,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
  },
};
</script>
```

### 示例 2: 只使用 Button 组件

```vue
<template>
  <div class="page">
    <my-button @click.native="handleClick">点击我</my-button>
  </div>
</template>

<script>
// 只引入 Button，Dialog 不会被打包
import MyButton from "@build-compons/components/lib/button";
import "@build-compons/components/lib/button/style.css";

export default {
  components: {
    MyButton,
  },
  methods: {
    handleClick() {
      console.log("Button clicked!");
    },
  },
};
</script>
```

## 🚀 性能优化建议

1. **使用按需加载**: 只引入需要的组件，减小打包体积
2. **配合 babel-plugin-import**: 让代码更简洁，自动处理样式
3. **启用 Gzip 压缩**: 在服务器端启用 Gzip，可以进一步减小传输体积
4. **使用 CDN**: 如果多个项目使用相同版本，可以使用 CDN 共享缓存

## ❓ 常见问题

### Q: 为什么按需引入还需要手动引入样式？

A: 这是为了让构建工具能够正确地进行 Tree Shaking。如果不喜欢手动引入样式，可以使用 `babel-plugin-import` 插件。

### Q: ES Module 版本如何使用？

A: ES Module 版本主要用于支持 Tree Shaking 的现代构建工具。使用方式：

```javascript
import { MyButton } from "@build-compons/components/es";
```

### Q: 如何验证按需加载是否生效？

A: 使用构建工具的分析插件（如 webpack-bundle-analyzer）查看打包产物，确认只包含了使用的组件。

## 📚 更多资源

- [Element UI 按需引入文档](https://element.eleme.io/#/zh-CN/component/quickstart#an-xu-yin-ru)
- [Vant 按需引入文档](https://vant-ui.github.io/vant/v2/#/zh-CN/quickstart#yin-ru-zu-jian)
- [babel-plugin-import](https://github.com/umijs/babel-plugin-import)



