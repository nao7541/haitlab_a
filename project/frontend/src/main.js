import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//---------- Base Components ----------//
import BaseCard from '@/components/UI/BaseCard.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseCheckBox from '@/components/UI/BaseCheckBox.vue';
import BaseSkill from '@/components/UI/BaseSkill.vue';
import vuetify from './plugins/vuetify';

//---------- Font Awesome ----------//
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faMapMarkerAlt, faCheck, faEnvelope, faUniversity, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faUser, faMapMarkerAlt, faCheck, faEnvelope, faUniversity, faBookOpen, faFacebookSquare, faTwitterSquare, faEdit);
Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.config.productionTip = false
// add base components
Vue.component('BaseCard', BaseCard);
Vue.component('BaseButton', BaseButton);
Vue.component('BaseCheckBox', BaseCheckBox);
Vue.component('BaseSkill', BaseSkill);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
