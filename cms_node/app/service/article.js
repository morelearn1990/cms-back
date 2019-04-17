const Service = require('egg').Service;
const utils = require('../utils/utils.js')

class ArticleService extends Service {
  async create(article) {
    const {
      ctx,
      app
    } = this

    const articleModel = ctx.model.Article
    let articleDoc = new articleModel(article)
    await articleDoc.save();
    return {
      result: true,
      article: articleDoc
    }
  }
  async update(article) {
    const {
      ctx,
      app
    } = this
    const articleModel = ctx.model.Article
    await articleModel.findByIdAndUpdate(article._id, article).exec()
    let articleDoc = await articleModel.findById(article._id)
    return {
      result: true,
      article: articleDoc
    }
  }

  async public(article) {
    const {
      ctx,
      app
    } = this
    const articleModel = ctx.model.Article
    let articleDoc = await articleModel.findById(article._id).exec()
    articleDoc.tag ? articleDoc.tag = 'normal' : ''
    await articleDoc.save()
    return {
      result: true,
      article: articleDoc
    }
  }

  async delete(article) {
    const {
      ctx,
      app
    } = this
    const articleModel = ctx.model.Article
    let articleDoc = await articleModel.findById(article._id).exec()
    articleDoc.tag ? articleDoc.tag = 'trash' : ''
    await articleDoc.save()
    return {
      result: true,
      article: articleDoc
    }
  }
}

module.exports = ArticleService;