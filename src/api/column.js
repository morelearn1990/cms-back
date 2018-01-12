export default [{
    path: '/column/list',
    data: {
        'list|20': [{
            'id|+1': 0,
            'title': '@ctitle(8,20)',
            'flag|1': ['推荐', '幻灯', '滚动', '图文', '普通'],
            'publicDate': '@date',
            'column': '@cword(3,5)',
            'click': '@natural(40,50)',
            'writer': '@cname(2,4)'
        }],
        "a": "adskjfhasdf"
    }
}]