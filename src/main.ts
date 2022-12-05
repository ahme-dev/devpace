import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedState));

app.mount("#app");
