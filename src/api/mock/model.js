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
    method: 'GET',
    query: 'id',
    data: {
        model: {
            'modelId|+1': 0,
            'modelName': '@cword(3,5)',
            'modelDes': '@csentence(10,15)',
            'isdefault': false,
            'modelItem|15': [{
                'varName': '@cword(3,5)',
                'var': '@word(3,5)',
                'varDes': '@csentence(10,15)',
                'varType|1': ['text','textArea','number','select','imgUpload','videoUpload','Richtext']
            }]
        }
    }
}, {
    path: '/model/column/edit/',
    method: 'GET',
    query: 'id',
    data: {
        model: {
            'modelId|+1': 0,
            'modelName': '@cword(3,5)',
            'modelDes': '@csentence(10,15)',
            'isdefault': false,
            'modelItem|15': [{
                'varName': '@cword(3,5)',
                'var': '@word(3,5)',
                'varDes': '@csentence(10,15)',
                'varType|1': ['text','textArea','number','select','imgUpload','videoUpload','Richtext']
            }]
        }
    }
}, {
    path: '/model/article/edit/post',
    method: 'POST',
    query: 'id',
    data: {
        "result": true
    }
}, {
    path: '/model/column/edit/post',
    method: 'post',
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