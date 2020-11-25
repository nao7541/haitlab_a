import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//---------- Font Awesome ----------//
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faFacebookSquare, faTwitterSquare);

//---------- Base Components ----------//
import BaseCard from '@/components/UI/BaseCard.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseCheckBox from '@/components/UI/BaseCheckBox.vue';
import BaseTag from '@/components/UI/BaseTag.vue';

const app = createApp(App);
// add font awesome
app.config.productionTip = false;
app.component('FontAwesomeIcon', FontAwesomeIcon);
// add base components
app.component('BaseCard', BaseCard);
app.component('BaseButton', BaseButton);
app.component('BaseCheckBox', BaseCheckBox);
app.component('BaseTag', BaseTag);
app.use(store);
app.use(router);
app.mount('#app');