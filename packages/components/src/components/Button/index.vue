<!--
 * @Author: 逗逗飞 wufei@strongdata.com.cn
 * @Date: 2025-10-01 16:47:33
 * @LastEditors: 逗逗飞 wufei@strongdata.com.cn
 * @LastEditTime: 2025-10-01 17:41:56
 * @FilePath: /build-compons/packages/components/src/components/Button/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <button class="my-button">
    <span class="button-left-deco"></span>
    <i v-if="icon" :class="['iconfont', icon]"></i>
    <slot></slot>
    <span class="button-right-deco"></span>
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
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  position: relative;
}

.my-button .iconfont {
  font-size: 16px;
}

/* 左侧装饰图片 */
.button-left-deco {
  width: 10px;
  height: 10px;
  background-image: url("@build-compons/common-assets/images/icons/button1.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
}

/* 右侧装饰图片 */
.button-right-deco {
  width: 10px;
  height: 10px;
  background-image: url("@build-compons/common-assets/images/icons/button2.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
}
</style>
