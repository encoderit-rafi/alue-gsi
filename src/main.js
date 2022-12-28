import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import JQuery from "jquery";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
import mixin from "./assets/scripts/helper.js";
import store from "./store";
import GoogleSignInButton from "vue-google-signin-button-directive";
import interceptorsSetup from "./helpers/interceptors";

interceptorsSetup();
require("./assets/styles/main.scss");
require("./assets/styles/styles.scss");
require("./assets/styles/main_media.scss");
require("./assets/styles/normalize/8.0.1/normalize.min.css");

window.$ = JQuery;
locale.use(lang);
Vue.use(ElementUI);
Vue.mixin(mixin);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  GoogleSignInButton,
  render: (h) => h(App),
}).$mount("#app");
