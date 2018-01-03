export default [{
    path: '/model/list',
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
    path: '/model/edit',
    type: 'get',
    query: 'id',
    data: {
        modelItem: {

        }
    }
}, {
    path: '/model/delete',
    query: 'id',
    type: 'delete',
    data: {
        status: 'success'
    }
}]