# 使用示例

## 📝 在组件库中使用公共资源

### 示例 1: 在 Button 组件中使用图标

```vue
<!-- packages/components/src/components/IconButton/index.vue -->
<template>
  <button class="icon-button">
    <img :src="iconSrc" :alt="iconAlt" class="icon" />
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "IconButton",
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconSrc() {
      return require(`@build-compons/common-assets/images/icons/${this.icon}.svg`);
    },
    iconAlt() {
      return `${this.icon} icon`;
    },
  },
};
</script>

<style>
.icon-button {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  width: 20px;
  height: 20px;
}
</style>
```

### 示例 2: 在组件中使用自定义字体

```vue
<!-- packages/components/src/components/CustomText/index.vue -->
<template>
  <div class="custom-text">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CustomText",
};
</script>

<style>
@font-face {
  font-family: "CustomFont";
  src: url("@build-compons/common-assets/fonts/CustomFont-Regular.woff2") format("woff2"),
    url("@build-compons/common-assets/fonts/CustomFont-Regular.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.custom-text {
  font-family: "CustomFont", sans-serif;
}
</style>
```

### 示例 3: 在文档项目中使用 Logo

```vue
<!-- packages/docs/src/components/Header.vue -->
<template>
  <header class="app-header">
    <img :src="logo" alt="Logo" class="logo" />
    <nav>
      <!-- 导航菜单 -->
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      // 方式一：直接 require
      logo: require("@build-compons/common-assets/images/logos/logo-light.png"),

      // 方式二：使用辅助函数
      // logo: this.$assets.getImagePath('logos/logo-light.png')
    };
  },
};
</script>

<style>
.app-header {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logo {
  height: 40px;
  width: auto;
}
</style>
```

## 🔧 配置全局资源访问

### 在 Vue 中注册全局资源辅助函数

```javascript
// packages/docs/src/main.js 或 packages/components/src/index.js

import Vue from "vue";
import assets from "@build-compons/common-assets";

// 注册全局属性
Vue.prototype.$assets = assets;

// 现在可以在任何组件中使用
// this.$assets.getImagePath('logo.png')
// this.$assets.getFontPath('custom.ttf')
```

## 📦 在 CSS/SCSS 中使用

### 全局样式中引用字体

```css
/* packages/docs/src/assets/styles/fonts.css */

@font-face {
  font-family: "Roboto";
  src: url("@build-compons/common-assets/fonts/Roboto-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Roboto";
  src: url("@build-compons/common-assets/fonts/Roboto-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: "Roboto", sans-serif;
}
```

### 使用背景图

```scss
/* packages/components/src/components/Hero/style.scss */

.hero-section {
  background-image: url("@build-compons/common-assets/images/backgrounds/hero-bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  // 提供 WebP 版本
  @supports (background-image: url("test.webp")) {
    background-image: url("@build-compons/common-assets/images/backgrounds/hero-bg.webp");
  }
}
```

## 🎨 动态引入资源

### 根据主题动态切换图片

```vue
<template>
  <div>
    <img :src="currentLogo" alt="Logo" />
    <button @click="toggleTheme">切换主题</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: "light",
    };
  },
  computed: {
    currentLogo() {
      const logoName =
        this.theme === "light" ? "logo-light.png" : "logo-dark.png";
      return require(`@build-compons/common-assets/images/logos/${logoName}`);
    },
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
    },
  },
};
</script>
```

### 图标映射

```javascript
// packages/components/src/utils/icons.js

const iconMap = {
  user: require("@build-compons/common-assets/images/icons/icon-user.svg"),
  settings: require("@build-compons/common-assets/images/icons/icon-settings.svg"),
  home: require("@build-compons/common-assets/images/icons/icon-home.svg"),
  search: require("@build-compons/common-assets/images/icons/icon-search.svg"),
};

export function getIcon(name) {
  return iconMap[name] || iconMap.user;
}

// 使用
import { getIcon } from "@/utils/icons";

export default {
  data() {
    return {
      userIcon: getIcon("user"),
    };
  },
};
```

## 🚀 优化技巧

### 1. 使用 SVG Sprite

```javascript
// packages/common-assets/images/icons/sprite.js

// 导出所有 SVG 图标
export { default as IconUser } from "./icon-user.svg";
export { default as IconSettings } from "./icon-settings.svg";
export { default as IconHome } from "./icon-home.svg";

// 在组件中使用
import { IconUser } from "@build-compons/common-assets/images/icons/sprite";
```

### 2. 响应式图片

```vue
<template>
  <picture>
    <source
      type="image/webp"
      :srcset="`
        ${require('@build-compons/common-assets/images/hero-small.webp')} 640w,
        ${require('@build-compons/common-assets/images/hero-medium.webp')} 1024w,
        ${require('@build-compons/common-assets/images/hero-large.webp')} 1920w
      `"
    />
    <img
      :src="require('@build-compons/common-assets/images/hero-medium.jpg')"
      alt="Hero"
    />
  </picture>
</template>
```

### 3. 懒加载图片

```vue
<template>
  <img
    :src="placeholder"
    :data-src="actualImage"
    class="lazy-image"
    alt="Lazy loaded"
  />
</template>

<script>
export default {
  data() {
    return {
      placeholder: require("@build-compons/common-assets/images/placeholder.png"),
      actualImage: require("@build-compons/common-assets/images/actual-image.jpg"),
    };
  },
  mounted() {
    // 使用 Intersection Observer 实现懒加载
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });

    observer.observe(this.$el);
  },
};
</script>
```

## 📱 实际应用场景

### 应用场景 1: 品牌一致性

所有组件和文档使用统一的 Logo、图标和字体，确保品牌视觉一致性。

### 应用场景 2: 主题切换

根据用户选择的主题（亮色/暗色），动态加载相应的图标和背景图。

### 应用场景 3: 国际化

不同语言版本使用不同的图片资源（如包含文字的宣传图）。

### 应用场景 4: 性能优化

统一管理和优化图片资源，避免重复加载，减小包体积。
