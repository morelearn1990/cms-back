// article router
import article from '../pages/article/index.vue'
import articleList from '../pages/article/list.vue'
import articleEdit from '../pages/article/edit.vue'

export default {
    path: '/article',
    meta: { title: '文章管理' },
    component: article,
    children: [
        { path: '', name: 'article', meta: { title: '文章列表' }, component: articleList },
        { path: 'list/:id', name: 'articleList', meta: { title: '文章列表' }, component: articleList }, 
        { path: 'edit/:id', name: 'articleEdit', meta: { title: '文章编辑' }, component: articleEdit }
    ]
}