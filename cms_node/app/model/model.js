module.exports = app => {
  const mongoose = app.mongoose;
  const ObjectId = mongoose.Schema.Types.ObjectId;
  const ModelSchema = new mongoose.Schema({
    name: {
      type: String
    },
    cname: {
      type: String
    },
    type: {
      type: String
    },
    classify: {
      type: String,
      default: "custom"
    },
    builder: {
      type: String
    },
    description: {
      type: String
    },
    fields: [{
      type: ObjectId,
      ref: 'ModelField'
    }],
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }, {
    collection: 'model'
  });

  return mongoose.model('Model', ModelSchema);
}