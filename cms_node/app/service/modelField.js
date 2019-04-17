const Service = require('egg').Service;

class ModelFieldService extends Service {
  async create(modelField) {
    const {
      ctx
    } = this
    let modelFieldModel = ctx.model.ModelField
    let oldDoc = await modelFieldModel.find({
      name: modelField.name
    }).exec()
    if (oldDoc.length > 0) {
      return {
        result: false,
        message: '已经存在相同命名的字段'
      }
    }
    let modelFieldDoc = new modelFieldModel(modelField)
    await modelFieldDoc.save()
    return {
      modelField: modelFieldDoc
    }
  }
  async update(modelField) {
    const {
      ctx
    } = this
    let modelFieldModel = ctx.model.ModelField
    await modelFieldModel.findByIdAndUpdate(modelField._id, modelField).exec()
    let modelFieldDoc = await modelFieldModel.findById(modelField._id).exec()
    return modelFieldDoc
  }
  async update(modelField) {
    const {
      ctx
    } = this
    let modelFieldModel = ctx.model.ModelField
    await modelFieldModel.findByIdAndUpdate(modelField._id, modelField).exec()
    let modelFieldDoc = await modelFieldModel.findById(modelField._id).exec()
    return modelFieldDoc
  }
}

module.exports = ModelFieldService;