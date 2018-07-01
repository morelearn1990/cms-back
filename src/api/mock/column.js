export default [{
    path: '/column/list',
    data: {
        'columnList|5': [{
            'columnId|+1': 0,
            'columnName': '@cword(8,16)',
            'total': '@natural(0,20)',
            'children|5': [{
                'columnId|+1': 0,
                'columnName': '@cword(8,16)',
                'total': '@natural(0,20)',
                'children|5': [{
                    'columnId|+1': 0,
                    'columnName': '@cword(8,16)',
                    'total': '@natural(0,20)',
                    'children': []
                }]
            }]
        }]
    }
}, {
    path: '/column/delete',
    method: 'DELETE',
    data: {
        'result': true
    }
}, {
    path: '/column/edit',
    method: 'GET',
    data: {
        'column': [{
                'cname': 'Id',
                'name': 'id',
                'value|+1': 0,
                'type': 'auto'
            }, {
                'cname': '名称',
                'name': 'name',
                'value': '@cname(4,5)',
                'type': 'text'
            }, {
                'cname': '内容模型',
                'name': 'articlemodel',
                'value|1': [1, 2, 3],
                'type': 'select',
                'source': [{
                    'name': '普通文章',
                    'value': 1
                }, {
                    'name': '图片集',
                    'value': 2
                }, {
                    'name': '视频集',
                    'value': 3
                }]
            }, {
                'cname': 'SEO标题',
                'name': 'seotitle',
                'value': '@ctitle()',
                'type': 'text'
            }, {
                'cname': 'SEO关键词',
                'name': 'keywords',
                'value': '@cword()',
                'type': 'text'
            },
            {
                'cname': '栏目描述',
                'name': 'description',
                'value': '@cparagraph()',
                'type': 'textarea'
            }, {
                'cname': '缩略图',
                'name': 'thumbnail',
                'value': [{
                    'url': '@dataImage("336x280")'
                }],
                'type': 'fileimg'
            },
            {
                'cname': '内容',
                'name': 'content',
                'value': '@cparagraph(50)',
                'type': 'richtext'
            }
        ]
    }
}, {
    path: '/column/new',
    method: 'GET',
    data: {
        'column': [{
                'cname': 'Id',
                'name': 'id',
                'value': '',
                'type': 'auto'
            }, {
                'cname': '名称',
                'name': 'name',
                'value': '',
                'type': 'text'
            }, {
                'cname': '内容模型',
                'name': 'articlemodel',
                'value': '',
                'type': 'select',
                'source': [{
                    'name': '普通文章',
                    'value': '1'
                }, {
                    'name': '图片集',
                    'value': '2'
                }, {
                    'name': '视频集',
                    'value': '3'
                }]
            }, {
                'cname': 'SEO标题',
                'name': 'seotitle',
                'value': '',
                'type': 'text'
            }, {
                'cname': 'SEO关键词',
                'name': 'publicDate',
                'value': '',
                'type': 'text'
            },
            {
                'cname': '栏目描述',
                'name': 'description',
                'value': '',
                'type': 'textarea'
            }, {
                'cname': '缩略图',
                'name': 'thumbnail',
                'value': [],
                'type': 'fileimg'
            },
            {
                'cname': '内容',
                'name': 'content',
                'value': '',
                'type': 'richtext'
            }
        ]
    }
}]