module.exports = app => {
  const mongoose = app.mongoose;
  const ObjectId = mongoose.Schema.Types.ObjectId;
  const OauthTokenSchema = new mongoose.Schema({
    accessToken: {
      type: String
    },
    accessTokenExpiresAt: {
      type: Date
    },
    refreshToken: {
      type: String
    },
    refreshTokenExpiresAt: {
      type: Date
    },
    client: {
      type: mongoose.Schema.Types.Mixed
    },
    user: {
      type: ObjectId,
      ref: 'User'
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
    collection: 'oauthToken'
  });

  return mongoose.model('OauthToken', OauthTokenSchema);
}