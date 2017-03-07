// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
// new对象时，必须把该对象赋给一个变量
// 单独给下面代码注释，可以跳过eslint规则校验
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
