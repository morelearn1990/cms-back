// model router
import Model from '../pages/model/index.vue'
import modelList from '../pages/model/list.vue'
import modelEdit from '../pages/model/modelEdit.vue'

export default {
    path: '/model',
    meta: { title: '模型管理' },
    component: Model,
    children: [
        { path: '', name: 'model', meta: { title: '模型列表' }, component: modelList },
        { path: 'list', name: 'modelList', meta: { title: '模型列表' }, component: modelList },
        { path: 'edit/:id', name: 'modelEdit', meta: { title: '模型编辑' }, component: modelEdit }
    ]
}