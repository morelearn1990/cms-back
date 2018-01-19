export default [{
    path: '/column/list',
    data: {
        'columnList|5': [{
            'columnId|+1': 0,
            'columnName': '@cword(8,16)',
            'total': '@natural(0,20)',
            'children|5':[{
                'columnId|+1': 0,
                'columnName': '@cword(8,16)',
                'total': '@natural(0,20)',
                'children|5':[{
                    'columnId|+1': 0,
                    'columnName': '@cword(8,16)',
                    'total': '@natural(0,20)',
                    'children':[]
                }]
            }]
        }]
    }
},{
    path: '/column/delete',
    method:'DELETE',
    data: {
        'result': true
    }
}]