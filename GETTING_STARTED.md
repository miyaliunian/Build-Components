# 🚀 快速开始指南

## 项目已完成改造 ✅

你的组件库已经成功改造为支持真正按需加载的现代化组件库！

## 📊 改造效果

根据实际测试，按需引入**单个组件可节省 69.4% 的体积**！

```
只使用 Button 组件:
├── 按需引入: 1.01 KB  ✅
├── 全量引入: 3.30 KB
└── 节省体积: 69.4% 📉
```

## 🎯 立即开始

### 1️⃣ 构建组件库

```bash
cd packages/components
pnpm run build
```

**输出**：

- ✅ `lib/` - CommonJS 格式（生产环境）
- ✅ `es/` - ES Module 格式（支持 Tree Shaking）

### 2️⃣ 分析打包效果

```bash
pnpm run analyze
```

这会展示：

- 📦 每个组件的大小
- 📊 按需引入 vs 全量引入的对比
- 💡 推荐的使用方案

### 3️⃣ 查看演示

```bash
cd packages/docs
pnpm run serve
```

访问 http://localhost:8080 查看组件演示。

## 💻 三种使用方式

### 方式 1️⃣: 按需引入（最小体积 🏆）

```javascript
import MyButton from "@build-compons/components/lib/button";
import "@build-compons/components/lib/button/style.css";

export default {
  components: { MyButton },
};
```

**优点**：体积最小，只打包使用的组件  
**缺点**：需要手动引入样式  
**适用**：使用 1-2 个组件的场景

### 方式 2️⃣: 自动按需引入（推荐 ⭐⭐⭐⭐⭐）

**第一步**：安装插件

```bash
npm install babel-plugin-import -D
```

**第二步**：配置 `babel.config.js`

```javascript
module.exports = {
  plugins: [
    [
      "import",
      {
        libraryName: "@build-compons/components",
        libraryDirectory: "lib",
        style: true,
      },
      "@build-compons/components",
    ],
  ],
};
```

**第三步**：使用组件

```javascript
// 写法简洁，自动转换为按需引入！
import { MyButton, MyDialog } from "@build-compons/components";

export default {
  components: { MyButton, MyDialog },
};
```

**优点**：写法简洁 + 体积小  
**缺点**：需要配置 Babel  
**适用**：所有场景（最推荐）

### 方式 3️⃣: 全量引入（简单但体积大）

```javascript
import MyComponents from "@build-compons/components";
import "@build-compons/components/lib/style.css";

Vue.use(MyComponents);
```

**优点**：使用简单  
**缺点**：体积大  
**适用**：使用所有组件的场景

## 📁 项目结构说明

```
packages/components/
├── lib/                    # 构建产物（CommonJS）
│   ├── index.js           # 全量引入入口
│   ├── style.css          # 全局样式
│   ├── button/            # Button 组件（1.01 KB）
│   │   ├── index.js
│   │   └── style.css
│   └── dialog/            # Dialog 组件（2.25 KB）
│       ├── index.js
│       └── style.css
├── es/                    # 构建产物（ES Module）
├── src/                   # 源代码
│   ├── components/
│   │   ├── Button/
│   │   │   ├── index.vue  # 组件实现
│   │   │   └── index.js   # 组件入口
│   │   └── Dialog/
│   │       ├── index.vue
│   │       └── index.js
│   └── index.js           # 主入口
├── build.js               # 构建脚本
├── analyze-bundle.js      # 分析脚本
├── webpack.config.js      # Webpack 配置
└── package.json
```

## 🎨 添加新组件

### 步骤 1: 创建组件文件

```bash
mkdir src/components/MyNewComponent
```

创建 `src/components/MyNewComponent/index.vue`:

```vue
<template>
  <div class="my-new-component">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MyNewComponent",
};
</script>

<style>
.my-new-component {
  /* 样式 */
}
</style>
```

### 步骤 2: 创建组件入口

创建 `src/components/MyNewComponent/index.js`:

```javascript
import MyNewComponent from "./index.vue";

MyNewComponent.install = function (Vue) {
  Vue.component(MyNewComponent.name, MyNewComponent);
};

export default MyNewComponent;
```

### 步骤 3: 导出组件

在 `src/index.js` 中添加：

```javascript
import MyNewComponent from "./components/MyNewComponent";

const components = [
  MyButton,
  MyDialog,
  MyNewComponent, // 添加新组件
];

// ...

export { MyButton, MyDialog, MyNewComponent }; // 导出
```

### 步骤 4: 构建

```bash
pnpm run build
```

完成！新组件会自动打包到 `lib/mynewcomponent/`

## 📚 文档导航

- 📖 **README.md** - 项目总览
- 📝 **CHANGELOG.md** - 改造详情和原理
- 🎓 **PROJECT_SUMMARY.md** - 完整总结
- 📘 **packages/components/README.md** - 组件库文档
- 📕 **packages/components/USAGE.md** - 详细使用指南
- 🚀 **GETTING_STARTED.md**（本文件）- 快速开始

## 🔍 常用命令

```bash
# 构建组件库
cd packages/components && pnpm run build

# 分析打包产物
cd packages/components && pnpm run analyze

# 运行文档项目
cd packages/docs && pnpm run serve

# 安装依赖（在根目录）
pnpm install
```

## ✅ 检查清单

在开始使用前，确保：

- [x] 已运行 `pnpm install` 安装依赖
- [x] 已运行 `pnpm run build` 构建组件库
- [x] 已查看 `pnpm run analyze` 的分析结果
- [x] 已阅读 `packages/components/USAGE.md`
- [x] 了解三种引入方式的区别

## 💡 最佳实践

### ✅ 推荐做法

1. **配置 babel-plugin-import**，享受自动按需引入
2. **按需引入**，只引入使用的组件
3. **查看分析报告**，了解每个组件的体积
4. **阅读文档**，了解更多使用技巧

### ❌ 不推荐做法

1. ~~全量引入~~（除非使用所有组件）
2. ~~不看文档就开始用~~
3. ~~不运行 analyze 就上生产~~

## 🎉 改造成果

✅ **真正的按需加载** - 单组件节省 69.4% 体积  
✅ **独立打包** - 每个组件独立文件  
✅ **样式分离** - CSS 与 JS 完全分离  
✅ **多种引入方式** - 灵活适配不同场景  
✅ **Tree Shaking** - 支持现代构建工具  
✅ **完整文档** - 详细的使用说明  
✅ **分析工具** - 可视化打包效果

## 🆘 需要帮助？

1. 查看 `packages/components/USAGE.md` 了解详细用法
2. 查看 `CHANGELOG.md` 了解改造原理
3. 查看 `PROJECT_SUMMARY.md` 了解完整信息
4. 运行 `pnpm run analyze` 查看打包分析

---

**🎊 开始使用你的现代化组件库吧！**

下一步建议：

1. 运行 `cd packages/docs && pnpm run serve` 查看演示
2. 配置 `babel-plugin-import` 实现自动按需引入
3. 开始在你的项目中使用组件库！



