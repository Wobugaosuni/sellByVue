// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 1. 引入路由
import Vue from 'vue';
import App from './App';  // 引入子组件
import VueRouter from 'vue-router';  // 引入路由，name:查看node-modules下vue-router的package.json的name
import goods from './components/goods/goods';  // 引入路由子件
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

import './common/stylus/index.styl';  // 引入全局样式

Vue.use(VueRouter);  // 使用路由功能

// 2. 定义路由
const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
];

// 3. 创建路由实例，传入'routes'配置
const router = new VueRouter({
  routes
});

// 4. 创建和挂载根实例
new Vue({
  el: '#app',  // 挂载到index.html的#app元素上
  template: '<App />',
  components: { App },
  router
}).$mount('#app');

// 5. 定义默认路由
router.push('/goods');

// Vue.config.productionTip = false;

/* eslint-disable no-new */
// new对象时，必须把该对象赋给一个变量
// 单独给下面代码注释，可以跳过eslint规则校验
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// });
