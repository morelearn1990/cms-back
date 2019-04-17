const utils = {}

utils.modelNameFormat = (modelDoc) => {
  return `${modelDoc.type.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}${modelDoc.classify.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}${modelDoc.name.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}`
}
utils.modelCollectionNameFormat = (modelDoc) => {
  return `${modelDoc.type.toLowerCase()}${modelDoc.classify.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}${modelDoc.name.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}`
}
utils.bindModel = async function (app, ctx, modelDoc) {
  let collectionName = this.modelCollectionNameFormat(modelDoc)
  let modelName = this.modelNameFormat(modelDoc)
  if (ctx.model[modelName] != false) {
    return new Error('已经有同名模型')
  }
  const mongoose = app.mongoose
  const ObjectId = mongoose.Schema.Types.ObjectId
  const modelFieldModel = ctx.model.ModelField

  const modelFieldIds = modelDoc.fields
  let tempObject = {}
  for (let i = 0; i < modelFieldIds.length; i++) {
    let modelFieldDoc = await modelFieldModel.findById(modelFieldIds[i]).exec()
    modelFieldDoc.inputType == 'number' ? tempObject[modelFieldDoc.name] = Number : tempObject[modelFieldDoc.name] = String
  }
  Object.assign(tempObject, {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  })
  const TempSchema = new mongoose.Schema(tempObject, {
    collection: `${collectionName}`
  });
  ctx.model[modelName] = mongoose.model(modelName, TempSchema)
}

utils.unbindModel = function (app, ctx, modelDoc) {
  let mongoose = app.mongoose
  let collectionName = this.modelCollectionNameFormat(modelDoc)
  let modelName = this.modelNameFormat(modelDoc)

  // 需要清除之前生成的 collection
  ctx.model[modelName] = null
}

module.exports = utils