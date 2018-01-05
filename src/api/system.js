// ['text', 'text-area', 'redios', 'checkbox', 'image', 'number'],

export default [{
        path: '/system/base',
        data: [{
                'id': '1',
                'name': 'baseUrl',
                'des': '网站根目录',
                'value': '@domain',
                'inputType': 'text',
                'group': '1'
            },
            {
                'id': '2',
                'name': 'webName',
                'des': '网站名称',
                'value': '@cword(5)',
                'inputType': 'text',
                'group': '1'
            },
            {
                'id': '3',
                'name': 'powerby',
                'des': '版权',
                'value': '@morelearn',
                'inputType': 'text',
                'group': '1'
            },
            {
                'id': '4',
                'name': 'keywords',
                'des': '关键词',
                'value|3-10': '@cword(3,6),',
                'inputType': 'textarea',
                'group': '1'
            },
            {
                'id': '5',
                'name': 'description',
                'des': '网站描述',
                'value': '@csentence(30,100)',
                'inputType': 'textarea',
                'group': '1'
            },
            {
                'id': '6',
                'name': 'email',
                'des': '邮件',
                'value': '@email',
                'inputType': 'text',
                'group': '1'
            },
            {
                'id': '7',
                'name': 'tellphone',
                'des': '电话',
                'value': '123-4567-8910',
                'inputType': 'text',
                'group': '1'
            },
            {
                'id': '8',
                'name': 'address',
                'des': '地址',
                'value': '@csentence(10,20)',
                'inputType': 'text',
                'group': '1'
            },
            {
                'id': '9',
                'name': 'autoArticlePic',
                'des': '自动提取第一张图片为缩略图',
                'value': '@boolean(true)',
                'inputType': 'bolean',
                'group': '2'
            },
            {
                'id': '10',
                'name': 'autoArticleKeywords',
                'des': '自动提取关键词',
                'value': '@boolean(true)',
                'inputType': 'bolean',
                'group': '2'
            },
            {
                'id': '11',
                'name': 'autoArticleDescription',
                'des': '自动摘取第一段为摘要',
                'value': '@boolean(true)',
                'inputType': 'bolean',
                'group': '2'
            },
            {
                'id': '12',
                'name': 'autoDescriptionLenght',
                'des': '自动摘要长度（0-250，0表示不启用）',
                'value': '@integer(0,250)',
                'inputType': 'number',
                'group': '3'
            }
        ]
    },
    {
        path: '/system/user',
        data: {
            'list|3-4': [{
                'userId|+1': 0,
                'userTypeName|1': ['超级管理员', '栏目管理员', '文档管理员'],
                'userName|1': ['编辑', '逗逼', '高富帅', '屌丝', '成功者'],
                'password': '@string(8)'
            }]
        }
    },
    {
        path: '/system/usermodel',
        data: {
            'list|3': [{
                'userTypeId|+1': 0,
                'userTypeDefault': true,
                'userTypeName|1': ['超级管理员', '栏目管理员', '文档管理员'],
                'userType|1': ['root', 'column', 'archive'],
                'userTypeRight|1': ['系统设置权限', '栏目权限', '文章权限']
            }]
        }
    },
    {
        path: '/system/db',
        data: {

        }
    },
    {
        path: '/system/log',
        data: {
            'list|16-20': [{
                'logId|+1': 0,
                'logDate': '@date(MM-dd)',
                'logTime': '@time(HH:mm)',
                'logMessage': '@csentence(20,50)'
            }]
        }
    }
]