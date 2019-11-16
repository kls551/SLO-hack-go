import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css';
// import  b-container from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// import 'my_style.css';

Vue.config.productionTip = false
require('./assets/my_style.css');
Vue.use(BootstrapVue)
new Vue({
  render: h => h(App),
}).$mount('#app')
