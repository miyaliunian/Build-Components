# @build-compons/components

一个支持按需加载的 Vue 2 组件库。

## 安装

```bash
pnpm install @build-compons/components
# 或
npm install @build-compons/components
```

## 使用方式

### 方式一：按需引入（推荐）⭐

按需引入可以有效减少打包体积，只引入你需要的组件。

```javascript
// 引入单个组件
import MyButton from "@build-compons/components/lib/button";
import MyDialog from "@build-compons/components/lib/dialog";

// 引入样式
import "@build-compons/components/lib/button/style.css";
import "@build-compons/components/lib/dialog/style.css";

export default {
  components: {
    MyButton,
    MyDialog,
  },
};
```

### 方式二：全量引入

如果你的项目需要使用所有组件，可以全量引入。

```javascript
import MyComponents from "@build-compons/components";
import "@build-compons/components/lib/style.css";

// 全局注册所有组件
Vue.use(MyComponents);
```

### 方式三：按需引入（使用 ES Module）

```javascript
import { MyButton, MyDialog } from "@build-compons/components";

export default {
  components: {
    MyButton,
    MyDialog,
  },
};
```

## 配合 babel-plugin-import 使用（推荐）

为了更方便地实现按需加载，可以使用 `babel-plugin-import` 插件。

### 1. 安装插件

```bash
npm install babel-plugin-import -D
```

### 2. 配置 Babel

在 `babel.config.js` 或 `.babelrc` 中添加配置：

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

### 3. 使用组件

配置完成后，你可以这样引入组件，插件会自动处理按需加载：

```javascript
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

## 组件列表

- **MyButton**: 按钮组件
- **MyDialog**: 对话框组件

## 开发

```bash
# 安装依赖
pnpm install

# 构建组件库
pnpm run build

# 查看构建产物
# lib/ - CommonJS 格式
# es/ - ES Module 格式
```

## 目录结构

```
packages/components/
├── lib/           # CommonJS 格式的构建产物
│   ├── index.js   # 主入口
│   ├── button/    # Button 组件
│   │   ├── index.js
│   │   └── style.css
│   └── dialog/    # Dialog 组件
│       ├── index.js
│       └── style.css
├── es/            # ES Module 格式的源文件
│   └── ...
└── src/           # 源代码
    ├── index.js
    └── components/
        ├── Button/
        └── Dialog/
```

## 构建原理

1. **单独打包**: 每个组件都会被单独打包成独立的文件
2. **样式分离**: CSS 样式文件与 JS 文件分离，支持按需引入
3. **多种格式**: 提供 CommonJS (lib) 和 ES Module (es) 两种格式
4. **Tree Shaking**: 支持 Tree Shaking，未使用的组件不会被打包

## License

ISC



