import Vue from "vue";
import App from "./App.vue";
import responsive from "vue-responsive";

Vue.config.productionTip = false;

Vue.use(responsive);

new Vue({
  render(h) {
    return h(App);
  },
}).$mount("#app");
