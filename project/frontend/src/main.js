import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//---------- Base Components ----------//
import BaseCard from '@/components/UI/BaseCard.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseCheckBox from '@/components/UI/BaseCheckBox.vue';
import BaseSkill from '@/components/UI/BaseSkill.vue';

Vue.config.productionTip = false
// add base components
Vue.component('BaseCard', BaseCard);
Vue.component('BaseButton', BaseButton);
Vue.component('BaseCheckBox', BaseCheckBox);
Vue.component('BaseSkill', BaseSkill);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
