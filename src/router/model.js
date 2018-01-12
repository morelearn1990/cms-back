// model router
import Model from '../pages/model/index.vue'
import modelList from '../pages/model/list.vue'
import articleModelEdit from '../pages/model/articleModelEdit.vue'
import columnModelEdit from '../pages/model/columnModelEdit.vue'

export default {
    path: '/model',
    meta: { title: '模型管理' },
    component: Model,
    children: [
        { path: '', name: 'model', meta: { title: '模型列表' }, component: modelList },
        { path: 'list', name: 'modelList', meta: { title: '模型列表' }, component: modelList },
        { path: 'article/edit/:id', name: 'articleModelEdit', meta: { title: '文章编辑' }, component: articleModelEdit },
        { path: 'column/edit/:id', name: 'columnModelEdit', meta: { title: '栏目编辑' }, component: columnModelEdit }
    ]
}