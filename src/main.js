import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
/* eslint-disable */
Vue.config.productionTip = false;

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faPen, faTrash, faCommentAlt, faCartPlus, faUtensils, faSignal, faComments, faFilter, faUser, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faFacebook,
  faTwitter,
  faLinkedin,
  faUtensils,
  faCartPlus,
  faSignal,
  faComments,
  faFilter,
  faUser,
  faHandHoldingUsd,
  faCommentAlt,
  faPen,
  faTrash
)

Vue.component('font-icon', FontAwesomeIcon)

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.component('Loading', Loading);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
