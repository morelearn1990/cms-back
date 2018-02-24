// api 汇总，将 API 抽取出来方便后期改造
export default {
    login: { in: {
            url: '/login/in',
            type: 'POST',
            params: ['username', 'pwd']
        },
        out: {
            url: '/login/out',
            type: 'GET',
            params: []
        }
    },
    article: {
        list: {
            url: '/article/list',
            type: 'GET',
            params: ['type', 'columnId']
        },
        edit: {
            url: '/article/edit',
            type: 'GET',
            params: ['id']
        },
        editPost: {
            url: '/article/edit/post',
            type: 'POST',
            params: ['article']
        },
        multiedit: {
            url: '/article/multiedit',
            type: 'POST',
            params: ['ids', 'MultiEditValue']
        },
        delete: {
            url: '/article/delete',
            type: 'DELETE',
            params: ['ids']
        },
        editNew: {
            url: '/article/edit/new',
            type: 'GET',
            params: []
        }
    },
    column: {
        list: {
            url: '/column/list',
            type: 'GET',
            params: []
        },
        delete: {
            url: '/column/delete',
            type: 'DELETE',
            params: ['id']
        },
        edit: {
            url: '/column/edit',
            type: 'GET',
            params: ['id']
        },
        new: {
            url: '/column/new',
            type: 'GET',
            params: ['columnModelid']
        },
        editPost: {
            url: '/article/edit/post',
            type: 'POST',
            params: ['column']
        }
    },
    model: {
        column: {
            url: '/model/list/column',
            type: 'GET',
            params: []
        },
        article: {
            url: '/model/list/article',
            type: 'GET',
            params: []
        },
        delete: {
            url: '/model/delete',
            type: 'DELETE',
            params: ['id']
        },
        columnEdit: {
            url: '/model/column/edit/',
            type: 'GET',
            params: ['id']
        },
        columnEditPost: {
            url: '/model/column/edit/post',
            type: 'GET',
            params: ['model']
        },
        articleEdit: {
            url: '/model/column/edit/',
            type: 'POST',
            params: ['id']
        },
        articleEditPost: {
            url: '/model/column/edit/post',
            type: 'POST',
            params: ['id']
        }
    },
    system: {
        baseGet: {
            url: '/system/base',
            type: 'GET',
            params: []
        },
        baseAdd: {
            url: '/system/base/add',
            type: 'POST',
            params: ['setting']
        },
        baseEdit: {
            url: '/system/base/edit',
            type: 'POST',
            params: ['setting']
        },
        userGet: {
            url: '/system/user',
            type: 'GET',
            params: []
        },
        userAdd: {
            url: '/system/user/add',
            type: 'POST',
            params: ['user']
        },
        userEdit: {
            url: '/system/user/edit',
            type: 'POST',
            params: ['user']
        },
        userDelete: {
            url: '/system/user/delete',
            type: 'DELETE',
            params: ['id']
        },
        userModelGet: {
            url: '/system/usermodel',
            type: 'GET',
            params: []
        },
        userModelDelete: {
            url: '/system/usermodel/delete',
            type: 'DELETE',
            params: ['id']
        }
    }
}