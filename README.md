# Build Components

一个基于 pnpm workspace 的 Vue 2 组件库项目，支持按需加载。

## 项目结构

```
build-compons/
├── packages/
│   ├── components/      # 组件库源码
│   │   ├── src/         # 组件源代码
│   │   ├── lib/         # CommonJS 构建产物
│   │   └── es/          # ES Module 构建产物
│   ├── common-assets/   # 公共资源包（图片、字体）
│   │   ├── images/      # 图片资源
│   │   └── fonts/       # 字体资源
│   └── docs/            # 组件库文档和演示
└── pnpm-workspace.yaml
```

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 构建组件库

```bash
cd packages/components
pnpm run build
```

构建完成后，会生成以下目录：

- `lib/` - CommonJS 格式，用于 Node.js 环境和不支持 ES Module 的构建工具
- `es/` - ES Module 格式，支持 Tree Shaking

### 3. 启动文档项目

```bash
cd packages/docs
pnpm run serve
```

## 按需加载实现

本项目参考了 Element UI 和 Vant 的实现方式，支持真正的按需加载。

### 特点

✅ **单独打包**: 每个组件单独打包成独立文件  
✅ **样式分离**: CSS 与 JS 分离，支持按需引入  
✅ **多种格式**: 支持 CommonJS 和 ES Module  
✅ **Tree Shaking**: 未使用的组件不会被打包  
✅ **灵活引入**: 支持全量引入和按需引入

### 使用方式

#### 按需引入（推荐）

```javascript
// 只引入需要的组件
import MyButton from "@build-compons/components/lib/button";
import "@build-compons/components/lib/button/style.css";
```

#### 全量引入

```javascript
// 引入所有组件
import MyComponents from "@build-compons/components";
Vue.use(MyComponents);
```

#### 使用 babel-plugin-import（最佳实践）

```javascript
// 配置后可以这样写
import { MyButton, MyDialog } from "@build-compons/components";
// 自动转换为按需引入
```

详细使用方法请查看 [packages/components/README.md](./packages/components/README.md)

## 技术栈

- **Vue**: 2.6.14
- **构建工具**: Webpack 5
- **包管理器**: pnpm (workspace)
- **Babel**: 用于代码转译

## 开发流程

1. 在 `packages/components/src/components` 中开发新组件
2. 为组件添加独立的 `index.js` 入口文件
3. 在 `packages/components/src/index.js` 中导出新组件
4. 运行构建命令打包组件库
5. 在 `packages/docs` 中测试和演示组件

## 构建原理

### 传统方式的问题

之前使用 `vue-cli-service` 打包整个库，虽然提供了按需导出，但打包时仍会把所有组件打包在一起，无法实现真正的按需加载。

### 现在的方式

参考 Element UI 和 Vant 的实现：

1. **每个组件单独打包**: 使用 Webpack 为每个组件生成独立的文件
2. **主入口文件**: 提供完整的入口文件支持全量引入
3. **组件入口**: 每个组件有独立的入口文件支持按需引入
4. **样式分离**: CSS 文件单独提取，可按需引入

这样，当用户只引入一个组件时，只会打包该组件的代码，而不是整个组件库。

## Packages 说明

### 📦 @build-compons/components

组件库核心包，包含所有 Vue 组件。

- `src/` - 组件源代码
- `lib/` - CommonJS 格式构建产物
- `es/` - ES Module 格式构建产物

[查看详情](./packages/components/README.md)

### 🎨 @build-compons/common-assets

公共资源包，用于管理图片、字体等静态资源。

- `images/` - 图片资源（图标、Logo、背景图等）
- `fonts/` - 字体资源

[查看详情](./packages/common-assets/README.md)

### 📚 docs

文档和演示项目，用于展示组件的使用方法。

[在线预览](http://localhost:8080)（运行 `pnpm run serve` 后访问）

## License

ISC
