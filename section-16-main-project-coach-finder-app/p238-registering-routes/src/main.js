import { createApp } from 'vue';
import router from "@/router";

const app = createApp({}).mount('#app');

app.use(router);