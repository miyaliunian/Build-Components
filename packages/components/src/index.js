import MyButton from "./components/Button";
import MyDialog from "./components/Dialog";

const components = [MyButton, MyDialog];

const install = function (Vue) {
  if (install.installed) return;
  install.installed = true;
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  MyButton,
  MyDialog,
};

export { MyButton, MyDialog };
