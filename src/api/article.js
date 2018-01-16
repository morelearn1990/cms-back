export default [{
    path: '/article/list',
    method: 'GET',
    data: {
        'articleList|20': [{
            'id|+1': 0,
            'title': '@ctitle(8,20)',
            'flag|1': ['推荐', '幻灯', '滚动', '图文', '普通'],
            'publicDate': '@date',
            'column': '@cword(3,5)',
            'click': '@natural(40,50)',
            'writer': '@cname(2,4)'
        }]
    }
}, {
    path: '/article/edit',
    data: {
        'article': [
            {
                'cname':'Id',
                'name':'id',
                'value':'@integer(0,100)',
                'type':'auto'
            },{
                'cname':'标题',
                'name':'title',
                'value':'@ctitle(8,20)',
                'type':'text'
            },{
                'cname':'标签',
                'name':'flag',
                'value|1':['f', 'r', 's', 'n'],
                'type':'select',
                'source':[{
                    'value': 'f',
                    'name': '幻灯'
                }, {
                    'value': 'r',
                    'name': '推荐'
                }, {
                    'value': 's',
                    'name': '滚动'
                }, {
                    'value': 'n',
                    'name': '普通'
                }]
            },{
                'cname':'发布时间',
                'name':'publicDate',
                'value':'@date',
                'type':'auto'
            },{
                'cname':'栏目名称',
                'name': 'columnName',
                'value|1':['1','2','3'],
                'type':'select',
                'source':[{
                    name:'服务',
                    value:'1'
                },{
                    name:'商品',
                    value:'2'
                },{
                    name:'关于',
                    value:'3'
                }]
            },
            {
                'cname':'缩略图',
                'name':'thumbnail',
                'value':[{
                    'url':'@dataImage("336x280")'
                }],
                'type':'fileimg'
            },
            {
                'cname':'作者',
                'name':'writer',
                'value':'@cname(2,4)',
                'type':'auto'
            },
            {
                'cname':'关键词',
                'name':'keywords',
                'value':'@cname(4,6)',
                'type':'text'
            },
            {
                'cname':'简介',
                'name':'description',
                'value':'@cparagraph()',
                'type':'textarea'
            },
            {
                'cname':'内容',
                'name':'content',
                'value':'@cparagraph(50)',
                'type':'richtext'
            }
        ]
    }
}, {
    path: '/article/edit/new',
    data: {
        'article': [
            {
                'cname':'Id',
                'name':'id',
                'value':'',
                'type':'auto'
            },{
                'cname':'标题',
                'name':'title',
                'value':'',
                'type':'text'
            },{
                'cname':'标签',
                'name':'flag',
                'value':'s',
                'type':'select',
                'source':[{
                    'value': 'f',
                    'name': '幻灯'
                }, {
                    'value': 'r',
                    'name': '推荐'
                }, {
                    'value': 's',
                    'name': '滚动'
                }, {
                    'value': 'n',
                    'name': '普通'
                }]
            },{
                'cname':'发布时间',
                'name':'publicDate',
                'value':'',
                'type':'auto'
            },{
                'cname':'栏目名称',
                'name': 'columnName',
                'value':'1',
                'type':'select',
                'source':[{
                    name:'服务',
                    value:'1'
                },{
                    name:'商品',
                    value:'2'
                },{
                    name:'关于',
                    value:'3'
                }]
            },
            {
                'cname':'缩略图',
                'name':'thumbnail',
                'value':[],
                'type':'fileimg'
            },
            {
                'cname':'作者',
                'name':'writer',
                'value':'',
                'type':'auto'
            },
            {
                'cname':'关键词',
                'name':'keywords',
                'value':'',
                'type':'text'
            },
            {
                'cname':'简介',
                'name':'description',
                'value':'',
                'type':'textarea'
            },
            {
                'cname':'内容',
                'name':'content',
                'value':'',
                'type':'richtext'
            }
        ]
    }
}, {
    path: '/article/delete',
    method: "DELETE",
    data: {
        'result': true
    }
}, {
    path: '/article/edit/img',
    method: "POST",
    data: {
        'value':'@dataImage("336x280")'
    }
}, {
    path: '/article/multiedit',
    method: "post",
    data: {
        'result': true
    }
}]