# Babel Plugin Import 配置修复

## ❌ 问题描述

添加 Card 组件后，`babel-plugin-import` 出现路径重复问题：

```
ERROR: Can't resolve '@build-compons/components/lib/@build-compons/components/lib/card/style.css'
                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 重复的路径前缀
```

**错误原因**：

- ✅ `libraryDirectory: "lib"`
- ✅ `customName` 返回完整路径：`@build-compons/components/lib/${componentName}`
- ❌ 两者结合导致路径重复

---

## ✅ 解决方案

### 修复前的配置（错误）

```javascript
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "@build-compons/components",
        libraryDirectory: "lib", // ❌ 问题：这里已经指定了 lib 目录
        camel2DashComponentName: false,
        customName: (name) => {
          const componentName = name.replace(/^My/, "").toLowerCase();
          // ❌ 问题：这里又返回了包含 lib 的完整路径
          return `@build-compons/components/lib/${componentName}`;
        },
        customStyleName: (name) => {
          const componentName = name.replace(/^My/, "").toLowerCase();
          // ❌ 问题：路径会被重复添加
          return `@build-compons/components/lib/${componentName}/style.css`;
        },
      },
    ],
  ],
};
```

**转换结果（错误）**：

```javascript
// 源代码
import { MyCard } from "@build-compons/components";

// 转换后
import MyCard from "@build-compons/components/lib/card";
import "@build-compons/components/lib/@build-compons/components/lib/card/style.css";
//                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 路径重复！
```

---

### 修复后的配置（正确）

```javascript
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "@build-compons/components",
        // ✅ 移除 libraryDirectory，因为 customName 返回完整路径
        camel2DashComponentName: false,
        customName: (name) => {
          const componentName = name.replace(/^My/, "").toLowerCase();
          // ✅ 返回完整路径
          return `@build-compons/components/lib/${componentName}`;
        },
        style: (name) => {
          // ✅ name 是 customName 返回的完整路径
          // ✅ 直接在后面加上 /style.css
          return `${name}/style.css`;
        },
      },
      "@build-compons/components",
    ],
  ],
};
```

**转换结果（正确）**：

```javascript
// 源代码
import { MyCard } from "@build-compons/components";

// 转换后
import MyCard from "@build-compons/components/lib/card";
import "@build-compons/components/lib/card/style.css";
//      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 路径正确！
```

---

## 🔍 问题原因分析

### babel-plugin-import 的工作原理

1. **libraryDirectory**：指定库的子目录
2. **customName**：自定义组件路径
3. **style**：自定义样式路径

**关键点**：

- 如果同时使用 `libraryDirectory` 和 `customName` 返回完整路径，会导致路径重复
- **解决方案**：二选一
  - 方案 1：使用 `libraryDirectory`，`customName` 返回相对路径
  - 方案 2：不用 `libraryDirectory`，`customName` 返回完整路径 ✅（我们采用）

---

## 🎯 两种配置方案对比

### 方案 1：使用 libraryDirectory + 相对路径

```javascript
{
  libraryName: "@build-compons/components",
  libraryDirectory: "lib",
  customName: (name) => {
    // 只返回组件名（相对路径）
    return name.replace(/^My/, "").toLowerCase();
  },
  style: true,  // 自动查找 style.css
}
```

**转换过程**：

```
MyCard
  → customName 返回: "card"
  → 拼接: libraryName + "/" + libraryDirectory + "/" + "card"
  → 结果: "@build-compons/components/lib/card"
```

---

### 方案 2：不用 libraryDirectory + 完整路径 ✅

```javascript
{
  libraryName: "@build-compons/components",
  // 不使用 libraryDirectory
  customName: (name) => {
    const componentName = name.replace(/^My/, "").toLowerCase();
    // 返回完整路径
    return `@build-compons/components/lib/${componentName}`;
  },
  style: (name) => {
    // name 已经是完整路径
    return `${name}/style.css`;
  },
}
```

**转换过程**：

```
MyCard
  → customName 返回: "@build-compons/components/lib/card"
  → 直接使用: "@build-compons/components/lib/card"
  → 样式: "@build-compons/components/lib/card/style.css"
```

**优势**：

- ✅ 路径更清晰，不会混淆
- ✅ 更容易调试和理解
- ✅ 避免路径拼接错误

---

## 🛠️ 修复步骤

### 1. 清理缓存

```bash
cd packages/docs
rm -rf node_modules/.cache
```

**原因**：webpack 和 babel 会缓存编译结果

---

### 2. 修改 babel.config.js

移除 `libraryDirectory`，使用完整路径：

```javascript
{
  libraryName: "@build-compons/components",
  // 移除这一行: libraryDirectory: "lib",
  customName: (name) => {
    const componentName = name.replace(/^My/, "").toLowerCase();
    return `@build-compons/components/lib/${componentName}`;
  },
  style: (name) => {
    return `${name}/style.css`;
  },
}
```

---

### 3. 重启开发服务器

```bash
# 停止旧服务器
lsof -ti:8080 | xargs kill -9

# 启动新服务器
cd packages/docs
pnpm run serve
```

---

## 🎉 验证结果

### 预期行为

访问 http://localhost:8080，应该看到：

1. ✅ **编译成功**，无错误
2. ✅ **Button 组件**正常显示（5 个按钮）
3. ✅ **Card 组件**正常显示（3 个卡片）
4. ✅ **Dialog 组件**正常显示

### 检查编译后的代码

```javascript
// App.vue 源代码
import { MyButton, MyDialog, MyCard } from "@build-compons/components";

// Babel 转换后
import MyButton from "@build-compons/components/lib/button";
import "@build-compons/components/lib/button/style.css";
import MyDialog from "@build-compons/components/lib/dialog";
import "@build-compons/components/lib/dialog/style.css";
import MyCard from "@build-compons/components/lib/card";
import "@build-compons/components/lib/card/style.css";
```

**路径正确**！✅

---

## 💡 经验总结

### 使用 babel-plugin-import 的注意事项

1. **libraryDirectory 和 customName 不要重复指定路径**

   - 如果 customName 返回完整路径，就不要用 libraryDirectory
   - 如果使用 libraryDirectory，customName 返回相对路径

2. **style 函数的参数**

   - 参数是 customName 返回的路径
   - 不是原始的组件名

3. **清理缓存很重要**

   - 修改 babel 配置后必须清理缓存
   - `rm -rf node_modules/.cache`

4. **调试技巧**
   - 查看 webpack 编译错误中的完整路径
   - 如果路径重复，检查 libraryDirectory 和 customName
   - 使用 `console.log` 在 customName 和 style 函数中打印参数

---

## 📚 相关文档

- **babel-plugin-import**: https://github.com/umijs/babel-plugin-import
- **Element UI 配置示例**: https://element.eleme.io/#/zh-CN/component/quickstart
- **Vant 配置示例**: https://vant-contrib.gitee.io/vant/v2/#/zh-CN/quickstart

---

## 🔄 为什么之前没有这个问题？

**答案**：因为之前只有 Button 和 Dialog 两个组件，配置可能碰巧能工作。

添加 Card 组件后，暴露了配置中的问题：

- `libraryDirectory` 和 `customName` 返回完整路径的冲突
- 缓存可能掩盖了问题

**正确的做法**：从一开始就使用清晰、明确的配置方案（方案 2）。

---

**✅ 修复完成！现在访问 http://localhost:8080 查看效果！**
