// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './util/http'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueWechatTitle from 'vue-wechat-title'
import store from './store'
import 'babel-polyfill';
Vue.use(iView)
Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.use(VueWechatTitle);
/* eslint-disable no-new */
new Vue({
    router,
    store,
    components: { App },
    template: '<App/>'
}).$mount('#app');

 //路由跳转之前，  这里可以做页面跳转权限的说
router.beforeEach((to, from, next) => {
    console.info(to,from )
    iView.LoadingBar.start();

    //   1，  检查登录状态

    //   2， 判断要进的路由是否要进行权限检查， 以及该路由和用户登录状态的关联

    //   3， 判断路由权限
     next();
});

// 路由跳转之后
router.afterEach((to) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


