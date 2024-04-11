import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// use() connects our Vue app with a third party package
app.use(router);

app.mount('#app');
