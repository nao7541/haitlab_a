import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//---------- Font Awesome ----------//
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faTimes, faFacebookSquare, faTwitterSquare, faEdit, faUser);

//---------- Base Components ----------//
import BaseCard from '@/components/UI/BaseCard.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseCheckBox from '@/components/UI/BaseCheckBox.vue';
import BaseSkill from '@/components/UI/BaseSkill.vue';

const app = createApp(App);
// add font awesome
app.config.productionTip = false;
app.component('FontAwesomeIcon', FontAwesomeIcon);
// add base components
app.component('BaseCard', BaseCard);
app.component('BaseButton', BaseButton);
app.component('BaseCheckBox', BaseCheckBox);
app.component('BaseSkill', BaseSkill);
app.use(store);
app.use(router);
app.mount('#app');