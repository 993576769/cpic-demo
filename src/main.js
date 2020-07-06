import Vue from 'vue';
import App from './App';
import './filters';
import { request, showToast, showLoading, autoLoading, autoLoadingDecorator, pageRefresh, errToast, nav } from './utils';
import { service } from './service';
import { Collection } from './store';

Vue.config.productionTip = false;
Vue.prototype.$request = request;
Vue.prototype.$showToast = showToast;
Vue.prototype.$showLoading = showLoading;
Vue.prototype.$autoLoading = autoLoading;
Vue.autoLoading = autoLoadingDecorator;
Vue.pageRefresh = pageRefresh;
Vue.errToast = errToast;
Vue.prototype.$nav = nav;

Vue.prototype.$service = service;

Vue.prototype.$Collection = Collection;

App.mpType = 'app';

const app = new Vue({
  ...App
});

app.$mount();
