module.exports = app => {
  const mongoose = app.mongoose;
  const ObjectId = mongoose.Schema.Types.ObjectId;
  const Mixed = mongoose.Schema.Types.Mixed;
  const columnSchema = new mongoose.Schema({
    cname: {
      type: String
    },
    parentColumn: {
      type: ObjectId,
      ref: 'Column'
    },
    columnModel: {
      type: ObjectId,
      ref: 'Model'
    },
    articleModel: {
      type: ObjectId,
      ref: 'Model'
    },
    fields: {
      type: Mixed
    },
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }, {
    collection: 'column'
  });

  return mongoose.model('Column', columnSchema);
}