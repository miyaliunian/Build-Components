import MyButton from "./index.vue";

MyButton.install = function (Vue) {
  Vue.component(MyButton.name, MyButton);
};

export default MyButton;
