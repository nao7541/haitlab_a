import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import TheHeader from '@/components/UI/TheHeader.vue';
import TheButton from '@/components/UI/TheButton.vue';

const app = createApp(App);
app.component('TheHeader', TheHeader);
app.component('TheButton', TheButton);
app.use(store);
app.use(router);
app.mount('#app');