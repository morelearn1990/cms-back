// model router
import Model from '../pages/model/index.vue'
import modelList from '../pages/model/list.vue'
import articleEdit from '../pages/model/articleEdit.vue'
import columnEdit from '../pages/model/columnEdit.vue'

export default {
    path: '/model',
    meta: { title: '模型管理' },
    component: Model,
    children: [
        { path: '', name: 'model', meta: { title: '模型列表' }, component: modelList },
        { path: 'list', name: 'modelList', meta: { title: '模型列表' }, component: modelList },
        { path: 'article/edit/:id', name: 'articleEdit', meta: { title: '文章编辑' }, component: articleEdit },
        { path: 'column/edit/:id', name: 'columnEdit', meta: { title: '栏目编辑' }, component: columnEdit }
    ]
}