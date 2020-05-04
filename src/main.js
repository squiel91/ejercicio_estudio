import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';

Vue.use(VueKatex);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
