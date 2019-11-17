import Vue from 'vue'
import App from './App.vue'


import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { router } from './router'

Vue.config.productionTip = false
require('./assets/my_style.css');
Vue.use(BootstrapVue)
new Vue(
  {
  router,
  render: h => h(App),
}).$mount('#app')
