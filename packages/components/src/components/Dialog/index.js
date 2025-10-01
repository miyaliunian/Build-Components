import MyDialog from "./index.vue";

MyDialog.install = function (Vue) {
  Vue.component(MyDialog.name, MyDialog);
};

export default MyDialog;
