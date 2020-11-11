import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import TheHeader from '@/components/UI/TheHeader.vue'

const app = createApp(App);
app.component('TheHeader', TheHeader);
app.use(store);
app.use(router);
app.mount('#app');