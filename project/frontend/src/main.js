import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import TheHeader from '@/components/layout/TheHeader.vue';
import TheButton from '@/components/layout/TheButton.vue';
import TheCheckBox from '@/components/layout/TheCheckBox.vue';

const app = createApp(App);
app.component('TheHeader', TheHeader);
app.component('TheButton', TheButton);
app.component('TheCheckBox', TheCheckBox);
app.use(store);
app.use(router);
app.mount('#app');