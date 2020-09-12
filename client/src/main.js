import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from 'axios'
import './plugins/cordova'
import { firestorePlugin } from 'vuefire'
import vuetify, { i18n } from './plugins/vuetify';


if (typeof JSON.clone !== "function") {
  JSON.clone = function(obj) {
      return JSON.parse(JSON.stringify(obj));
  };
}

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(firestorePlugin)

Vue.use(require('vue-moment'))

new Vue({
  router,
  i18n,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
