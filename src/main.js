import Vue from 'vue';
import App from './App';
import './filters';
import { request } from './utils';
import { service } from './service';

Vue.config.productionTip = false;
Vue.prototype.$request = request;
Vue.prototype.$service = service;

App.mpType = 'app';

const app = new Vue({
  ...App
});
app.$mount();
