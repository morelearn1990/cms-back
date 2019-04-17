'use strict';

module.exports = app => {
  class Model {
    constructor(ctx) {
      this.ctx = ctx
    }
    async getClient(clientId, clientSecret) {
      let client = {
        clientId,
        clientSecret,
        grants: [
          "password"
        ]
      }
      if (clientId === 'my_app' && clientSecret === 'my_secret') {
        return client
      }
      return;
    }
    async getUser(username, password) {
      const userDoc = await app.model.User.findOne({
        name: username
      });
      if (!userDoc) {
        return;
      }
      // const result = await bcrypt.compare(password, userDoc.password);
      if (password != userDoc.password) {
        return;
      } else {
        return {
          _id: userDoc._id
        };
      }
    }
    async getAccessToken(bearerToken) {
      const tokenDoc = await app.model.OauthToken.findOne({
        accessToken: bearerToken
      }).exec();
      return tokenDoc
    }
    async saveToken(token, client, user) {
      let _token = Object.assign({}, token, {
        user: user._id
      }, {
        client
      });
      let tokenDoc = new app.model.OauthToken(_token);
      await tokenDoc.save();
      return _token
    }
    async revokeToken(token) {
      await app.model.OauthToken.findOne({
        token
      }).remove().exec()
    }
  }
  return Model;
};