// system router
import System from '../pages/system/index.vue'
import MenuBar from '../pages/system/menubar.vue'
import Base from '../pages/system/base.vue'
import User from '../pages/system/user.vue'
import UserModel from '../pages/system/usermodel.vue'
import Db from '../pages/system/db.vue'
import Log from '../pages/system/log.vue'


export default {
    path: '/system',
    meta: { title: '系统设置' },
    component: System,
    children: [
        { path: '', name: 'system', meta: { title: '导航' }, component: MenuBar },
        { path: 'base', name: 'system-base', meta: { title: '参数设置' }, component: Base },
        { path: 'user', name: 'system-user', meta: { title: '用户管理' }, component: User },
        { path: 'usermodel', name: 'system-usermodel', meta: { title: '用户权限' }, component: UserModel },
        { path: 'db', name: 'system-db', meta: { title: '数据库' }, component: Db },
        { path: 'log', name: 'system-log', meta: { title: '日志管理' }, component: Log }
    ]
}