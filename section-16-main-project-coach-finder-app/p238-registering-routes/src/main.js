import { createApp } from 'vue';
import router from "@/router";
import app from "@/App.vue";



const app = createApp({}).mount('#app');

app.use(router);

app.mount('#app')
