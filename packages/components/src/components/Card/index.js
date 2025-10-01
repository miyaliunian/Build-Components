import MyCard from "./index.vue";

MyCard.install = function (Vue) {
  Vue.component(MyCard.name, MyCard);
};

export default MyCard;
