module.exports = app => {
  const mongoose = app.mongoose;
  const ObjectId = mongoose.Schema.Types.ObjectId;
  const ModelFieldSchema = new mongoose.Schema({
    name: {
      type: String
    },
    cname: {
      type: String
    },
    inputType: {
      type: String
    },
    description: {
      type: String
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
    collection: 'modelField'
  });

  return mongoose.model('ModelField', ModelFieldSchema);
}