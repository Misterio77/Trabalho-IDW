import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
require('dotenv').config();

import VueCookie from 'vue-cookie';
import store from './store'


Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueCookie);
