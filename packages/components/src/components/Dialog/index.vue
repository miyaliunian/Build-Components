<template>
  <div v-if="visible" class="my-dialog-backdrop">
    <div class="my-dialog">
      <div class="my-dialog-header">
        <span class="my-dialog-title">{{ title }}</span>
        <button @click="close" class="my-dialog-close-btn">&times;</button>
      </div>
      <div class="my-dialog-body">
        <slot></slot>
      </div>
      <div class="my-dialog-footer">
        <slot name="footer">
          <my-button @click="close">关闭</my-button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '对话框'
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
    }
  }
}
</script>

<style>
.my-dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.my-dialog {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 400px;
  max-width: 90%;
}

.my-dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.my-dialog-title {
  font-size: 18px;
  font-weight: bold;
}

.my-dialog-close-btn {
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
}

.my-dialog-body {
  padding: 20px;
}

.my-dialog-footer {
  padding: 15px 20px;
  text-align: right;
  border-top: 1px solid #eee;
}
</style>
