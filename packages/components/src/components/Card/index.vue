<template>
  <div class="my-card">
    <div class="card-header" v-if="title || $slots.header">
      <img
        class="card-icon"
        src="@build-compons/common-assets/images/icons/button1.png"
        alt="icon"
      />
      <slot name="header">
        <span class="card-title">{{ title }}</span>
      </slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCard",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.my-card {
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s;
}

.my-card:hover {
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
}

.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.card-body {
  padding: 20px;
  color: #606266;
  line-height: 1.6;
}

.card-footer {
  padding: 12px 20px;
  border-top: 1px solid #ebeef5;
  background-color: #fafafa;
}
</style>
