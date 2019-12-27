// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import axios from 'axios'
import NProgress from 'nprogress'

import './utils/BaseExtends'
import 'ant-design-vue/dist/antd.css';
import './assets/scss/root.scss';

Vue.use(Antd);

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

NProgress.configure({     
  easing: 'ease',  // 动画方式    
  speed: 500,  // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

//当路由进入前
router.beforeEach((to, from , next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();

  if (to.meta.title) document.title = to.meta.title + ' - 梦欤的管理系统项目';
  else document.title = '梦欤的管理系统项目';

  next();
});
//当路由进入后：关闭进度条
router.afterEach(() => {  
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done();
})