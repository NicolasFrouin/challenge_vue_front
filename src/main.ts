import "element-plus/dist/index.css";
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import fr from "element-plus/es/locale/lang/fr";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(ElementPlus, { locale: fr });
app.use(createPinia());
app.use(router);

app.mount("#app");
