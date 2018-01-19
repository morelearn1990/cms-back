// Column router
import column from '../pages/column/index.vue'
import columnList from '../pages/column/list.vue'
import columnEdit from '../pages/column/edit.vue'

export default {
    path: '/column',
    meta: { title: '栏目管理' },
    component: column,
    children: [
        { path: '', name: 'column', meta: { title: '栏目列表' }, component: columnList },
        { path: 'list', name: 'columnList', meta: { title: '栏目列表' }, component: columnList },
        { path: ':type/:columnId', name: 'columnEdit', meta: { title: '栏目编辑' }, component: columnEdit },
    ]
}