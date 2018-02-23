// import dependencies
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'

import './assets/css/normaliz.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import './assets/css/font.css'
import './assets/css/common.less'
import '../node_modules/quill/dist/quill.core.css'
import '../node_modules/quill/dist/quill.snow.css'
import '../node_modules/quill/dist/quill.bubble.css'

import App from './App.vue'
import Routes from './router'
import Store from './store'
import Mock from './api/mockapi.js'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueAxios, Axios);

const router = new VueRouter({
    mode: 'history',
    base: '/admin/',
    routes: Routes
});

router.beforeEach((to, from, next) => {
    // 改变网页 title
    document.title = to.meta.title + ' CMS系统管理后台'
    next()
})

const store = new Vuex.Store({

});

new Vue({
    el: '#m_cms_app',
    router: router,
    store: store,
    components: { App },
    template: '<App/>'
});