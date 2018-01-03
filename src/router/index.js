import Index from '../pages/index/index.vue'

import Discuss from '../pages/discuss/index.vue'
import Channel from '../pages/channel/index.vue'
import Modular from '../pages/modular/index.vue'
import Statistics from '../pages/statistics/index.vue'

import article from './article.js'

import model from './model.js'
import system from './system.js'

const routers = [
    { path: '/', name: 'index', meta: { title: '首页' }, component: Index },
    article,
    model,
    { path: '/discuss', name: 'discuss', meta: { title: '评论管理' }, component: Discuss },
    { path: '/channel', name: 'channel', meta: { title: '栏目管理' }, component: Channel },
    { path: '/modular', name: 'modular', meta: { title: '模块管理' }, component: Modular },
    { path: '/statistics', name: 'statistics', meta: { title: '统计分析' }, component: Statistics },
    system
];
export default routers;