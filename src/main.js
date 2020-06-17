import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
/* eslint-disable */
Vue.config.productionTip = false;

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faTimes, faPen, faTrash, faCommentAlt, faCartPlus, faUtensils, faSignal, faComments, faFilter, faUser, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
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
  faTimes,
  faTrash
)

Vue.component('font-icon', FontAwesomeIcon)

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

//cloud
import Cloudinary from 'cloudinary-vue';
Vue.use(Cloudinary, {
  configuration: {
    cloudName: "pnvcc",
    apiKey: "282221733156254",
    apiSecret: "mdOuLQZxcAilfTKcV1DKXcADXes"
  }
});
import { CldImage } from 'cloudinary-vue';

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
