const Service = require('egg').Service;
const utils = require('../utils/utils.js')

class ColumnService extends Service {
  async create(column) {
    const {
      ctx,
      app
    } = this
    const columnModel = ctx.model.Column
    // const modelModel = ctx.model.Model
    // let columnFields = await modelModel.findById(column.columnModel).populate('fields').exec();
    let columnDoc = new columnModel(column)
    await columnDoc.save();
    return {
      result: true,
      column: columnDoc
    }
  }
  async update(column) {

  }
  async delete(column) {

  }
}

module.exports = ColumnService;