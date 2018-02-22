// import dependencies
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import './assets/css/normaliz.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import './assets/css/font.css'
import './assets/css/common.less'

import App from './App.vue'
import Routes from './router'
import Store from './store'
import Mock from './api/mockapi.js'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueAxios, Axios);

const router = new VueRouter({
    model: history,
    routes: Routes
});

const store = new Vuex.Store({

});

new Vue({
    el: '#m_cms_app',
    router: router,
    store: store,
    render: h => h(App),
});