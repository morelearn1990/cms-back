import Mock from 'mockjs'

import system from './system.js'
import article from './article.js'
import model from './model.js'
import column from './column.js'


function addToMock(lists) {
    lists.forEach(list => {
        Mock.mock(list.path, list.type, list.data)
    })
}

addToMock(system);
addToMock(article);
addToMock(model);
addToMock(column);

export default Mock