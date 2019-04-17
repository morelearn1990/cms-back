module.exports = app => {
  const mongoose = app.mongoose;
  const ObjectId = mongoose.Schema.Types.ObjectId;
  const Mixed = mongoose.Schema.Types.Mixed;
  const articleSchema = new mongoose.Schema(
    {
      title: {
        type: String,
      },
      tag: {
        type: String,
        default: 'draft',
      },
      flag: {
        type: String,
      },
      publicDate: {
        type: Date,
      },
      writter: {
        type: String,
      },
      column: {
        type: ObjectId,
        ref: 'Column',
      },
      fields: {
        type: Mixed,
      },
      createAt: {
        type: Date,
        default: Date.now(),
      },
      updateAt: {
        type: Date,
        default: Date.now(),
      },
    },
    {
      collection: 'article',
    }
  );

  return mongoose.model('Article', articleSchema);
};
