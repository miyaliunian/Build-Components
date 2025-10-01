# Button 组件使用 iconfont 字体图标

## ✅ 已完成配置

Button 组件已经集成了 `@build-compons/common-assets` 中的 iconfont 字体图标。

## 🎯 使用方式

### 基础用法

```vue
<template>
  <div>
    <!-- 普通按钮（无图标） -->
    <my-button>普通按钮</my-button>

    <!-- 带图标的按钮 -->
    <my-button icon="iconshanchu">删除按钮</my-button>
    <my-button icon="iconadd">添加按钮</my-button>
    <my-button icon="iconshoucang">收藏按钮</my-button>
    <my-button icon="iconfangdajing">搜索按钮</my-button>
  </div>
</template>

<script>
import { MyButton } from "@build-compons/components";

export default {
  components: { MyButton },
};
</script>
```

## 📋 可用的图标列表

从 `common-assets/fonts/iconfont.json` 可以看到所有可用的图标：

| 图标类名               | 说明         | 示例                                                        |
| ---------------------- | ------------ | ----------------------------------------------------------- |
| `iconshanchu`          | 删除         | `<my-button icon="iconshanchu">删除</my-button>`            |
| `iconadd`              | 添加         | `<my-button icon="iconadd">添加</my-button>`                |
| `iconshoucang`         | 收藏         | `<my-button icon="iconshoucang">收藏</my-button>`           |
| `iconshoucang1`        | 收藏（实心） | `<my-button icon="iconshoucang1">收藏</my-button>`          |
| `iconfangdajing`       | 搜索/放大镜  | `<my-button icon="iconfangdajing">搜索</my-button>`         |
| `icondianhua`          | 电话         | `<my-button icon="icondianhua">拨打</my-button>`            |
| `iconguanbi`           | 关闭         | `<my-button icon="iconguanbi">关闭</my-button>`             |
| `iconfanhui`           | 返回         | `<my-button icon="iconfanhui">返回</my-button>`             |
| `iconmore`             | 更多/省略号  | `<my-button icon="iconmore">更多</my-button>`               |
| `iconarrow-right`      | 右箭头       | `<my-button icon="iconarrow-right">下一步</my-button>`      |
| `iconarrow-left-bold`  | 左箭头（粗） | `<my-button icon="iconarrow-left-bold">上一步</my-button>`  |
| `iconarrow-right-bold` | 右箭头（粗） | `<my-button icon="iconarrow-right-bold">下一步</my-button>` |
| `icondown-arrow`       | 下箭头       | `<my-button icon="icondown-arrow">展开</my-button>`         |
| `iconup`               | 上箭头       | `<my-button icon="iconup">收起</my-button>`                 |
| `iconxin`              | 心形         | `<my-button icon="iconxin">点赞</my-button>`                |
| `iconchufang`          | 处方         | `<my-button icon="iconchufang">处方</my-button>`            |
| `iconbanquan`          | 版权         | `<my-button icon="iconbanquan">版权</my-button>`            |
| `iconduihao`           | 对号         | `<my-button icon="iconduihao">确认</my-button>`             |
| `iconrili-mianxing`    | 日历         | `<my-button icon="iconrili-mianxing">日历</my-button>`      |
| `iconwode-xianxing`    | 我的         | `<my-button icon="iconwode-xianxing">我的</my-button>`      |
| `iconhuiyuan-xianxing` | 会员         | `<my-button icon="iconhuiyuan-xianxing">会员</my-button>`   |
| `iconwushuju`          | 无数据       | `<my-button icon="iconwushuju">无数据</my-button>`          |
| `iconshuaxin-copy`     | 刷新         | `<my-button icon="iconshuaxin-copy">刷新</my-button>`       |

## 🎨 组件 Props

### icon

- **类型**: `String`
- **默认值**: `""`
- **说明**: iconfont 图标类名（不包括 `iconfont` 基础类）
- **示例**: `"iconshanchu"`, `"iconadd"`, `"iconshoucang"`

## 📝 完整示例

### 示例 1: 操作按钮组

```vue
<template>
  <div class="action-buttons">
    <my-button icon="iconadd" @click.native="handleAdd">新增</my-button>
    <my-button icon="iconshanchu" @click.native="handleDelete">删除</my-button>
    <my-button icon="iconshuaxin-copy" @click.native="handleRefresh"
      >刷新</my-button
    >
  </div>
</template>

<script>
import { MyButton } from "@build-compons/components";

export default {
  components: { MyButton },
  methods: {
    handleAdd() {
      console.log("新增");
    },
    handleDelete() {
      console.log("删除");
    },
    handleRefresh() {
      console.log("刷新");
    },
  },
};
</script>

<style>
.action-buttons {
  display: flex;
  gap: 12px;
}
</style>
```

### 示例 2: 导航按钮

```vue
<template>
  <div class="navigation">
    <my-button icon="iconfanhui" @click.native="goBack">返回</my-button>
    <my-button icon="iconarrow-right" @click.native="goNext">下一步</my-button>
  </div>
</template>
```

### 示例 3: 只显示图标（不显示文字）

```vue
<template>
  <div>
    <!-- 只显示图标，不传入文本 -->
    <my-button icon="iconguanbi" @click.native="handleClose"></my-button>
    <my-button icon="iconshoucang"></my-button>
    <my-button icon="iconmore"></my-button>
  </div>
</template>
```

## 🔧 自定义图标样式

### 修改图标大小

```vue
<template>
  <my-button icon="iconshanchu" class="large-icon-button">删除</my-button>
</template>

<style>
.large-icon-button .iconfont {
  font-size: 20px !important;
}
</style>
```

### 修改图标颜色

```vue
<template>
  <my-button icon="iconxin" class="red-icon-button">点赞</my-button>
</template>

<style>
.red-icon-button {
  background-color: #ff4d4f;
}

.red-icon-button .iconfont {
  color: #fff;
}
</style>
```

## 🎨 查看所有图标

打开文件查看所有可用图标：

```
packages/common-assets/fonts/demo_index.html
```

或者在浏览器中直接打开此文件查看图标预览。

## 📦 技术实现

### Button 组件更新

```vue
<template>
  <button class="my-button">
    <i v-if="icon" :class="['iconfont', icon]"></i>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    icon: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
/* 引入 iconfont 字体 */
@import "@build-compons/common-assets/fonts/iconfont.css";

.my-button {
  display: inline-flex;
  align-items: center;
  gap: 6px; /* 图标和文字的间距 */
}

.my-button .iconfont {
  font-size: 16px;
}
</style>
```

### 依赖配置

在 `packages/components/package.json` 中添加了：

```json
{
  "dependencies": {
    "@build-compons/common-assets": "workspace:^"
  }
}
```

这样 components 包就可以引用 common-assets 中的字体资源了。

## 🚀 在演示项目中查看

访问 http://localhost:8080，你会看到：

1. **普通按钮** - 无图标
2. **删除按钮** - 带删除图标（iconshanchu）
3. **添加按钮** - 带添加图标（iconadd）
4. **收藏按钮** - 带收藏图标（iconshoucang）
5. **搜索按钮** - 带搜索图标（iconfangdajing）

## 💡 最佳实践

1. **语义化命名**: 使用有意义的图标类名
2. **图标与文字搭配**: 提供更好的用户体验
3. **统一风格**: 所有图标来自同一字体库
4. **按需引入**: 字体文件会随着组件一起按需加载

## 📚 相关资源

- **iconfont.json** - 图标配置文件，包含所有图标信息
- **iconfont.css** - 图标样式文件
- **demo_index.html** - 图标预览页面
- **common-assets/README.md** - 资源包使用文档

---

**🎉 现在你可以在 Button 组件中使用丰富的字体图标了！**
