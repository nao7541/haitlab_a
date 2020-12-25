import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//---------- Base Components ----------//
import BaseBoard from '@/components/UI/BaseBoard.vue';
import BaseCard from '@/components/UI/BaseCard.vue';
import BaseProfileContent from '@/components/UI/BaseProfileContent.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseEditButton from '@/components/UI/BaseEditButton.vue';
import BaseModalButton from '@/components/UI/BaseModalButton.vue';
import BaseTab from '@/components/UI/BaseTab.vue';
import BaseTag from '@/components/UI/BaseTag.vue';
import BaseModal from '@/components/UI/BaseModal.vue';
import BaseForm from '@/components/UI/BaseForm.vue';
import vuetify from './plugins/vuetify';

//---------- Font Awesome ----------//
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faUserPlus, faUserMinus, faUsers, faMapMarkerAlt, faCheck, faEnvelope, faUniversity, faBookOpen, faTimes, faTag, faBolt, faBrain, faComments, faDollarSign, faHome, faBookmark, faSearch, faArrowLeft, faSignOutAlt, faSignInAlt, faBell, faLink, faPaperPlane, faSortUp, faSortDown, faEllipsisV, faTrash, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faEdit, faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faUser, faUserPlus, faUserMinus, faUsers, faMapMarkerAlt, faCheck, faEnvelope, faUniversity, faBookOpen, faTimes, faTag, faBolt, faBrain, faComments, faDollarSign, faHome, faBookmark, faSearch, faArrowLeft, faSignOutAlt, faSignInAlt, faBell, faLink, faPaperPlane, faSortUp, faSortDown, faEllipsisV, faTrash, faPencilAlt,
            faFacebookSquare, faTwitterSquare,
            faEdit, faLightbulb);
Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.config.productionTip = false
// add base components
Vue.component('BaseBoard', BaseBoard);
Vue.component('BaseCard', BaseCard);
Vue.component('BaseProfileContent', BaseProfileContent);
Vue.component('BaseButton', BaseButton);
Vue.component('BaseEditButton', BaseEditButton);
Vue.component('BaseModalButton', BaseModalButton);
Vue.component('BaseTab', BaseTab);
Vue.component('BaseTag', BaseTag);
Vue.component('BaseModal', BaseModal);
Vue.component('BaseForm', BaseForm);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
