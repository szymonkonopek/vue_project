import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(router).use(store).mount("#app");

// createApp.config.productionTip = false;

// new createApp({
//   router,
//   store,
//   render: (h) => h(App),
// }).$mount("#app");
