export default [{
    path: '/model/list/article',
    data: {
        'lists|5': [{
            'id|+1': 0,
            'name': '@cword(3,5)',
            'type|1': ['default', 'custom'],
            'builder': '@cword(3,5)',
            'description': '@csentence(10,15)'
        }]
    }
}, {
    path: '/model/list/column',
    data: {
        'lists|5': [{
            'id|+1': 0,
            'name': '@cword(3,5)',
            'type|1': ['default', 'custom'],
            'builder': '@cword(3,5)',
            'description': '@csentence(10,15)'
        }]
    }
}, {
    path: '/model/article/edit/',
    type: 'get',
    query: 'id',
    data: {
        modelItem: {

        }
    }
}, {
    path: '/model/column/edit/',
    type: 'get',
    query: 'id',
    data: {
        modelItem: {

        }
    }
}, {
    path: '/model/article/edit/',
    type: 'post',
    query: 'id',
    data: {
        "result": true
    }
}, {
    path: '/model/column/edit/',
    type: 'post',
    query: 'id',
    data: {
        "result": true
    }
}, {
    path: '/model/delete',
    query: 'id',
    type: 'delete',
    data: {
        status: 'success'
    }
}]