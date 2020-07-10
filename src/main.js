import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './registerServiceWorker'

import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';

import Landing from './Landing.vue'
import Editor from './Editor.vue'

Vue.use(VueRouter);
Vue.use(VueKatex);

var routes = [
  {path: '', component: Landing, name: 'landing'},
  {path: '/editor', component: Editor, name: 'editor'}
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
