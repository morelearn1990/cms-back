'use strict';

const Controller = require('egg').Controller;
const ArticleNewRole = {
  title: 'string',
  flag: 'string',
  column: 'string'
}
const ArticleEditRole = {
  _id: 'string',
  ...ArticleNewRole
}

class ArticleController extends Controller {
  async index() {
    const {
      ctx
    } = this
    let tag = ctx.query.tag
    let column = ctx.query.column
    let articles;
    column ? articles = await ctx.model.Article.find({
      tag,
      column
    }).populate('column') : articles = await ctx.model.Article.find({
      tag
    }).populate('column');
    ctx.body = {
      result: true,
      articles
    }
    ctx.status = 200;
  }

  async create() {
    let {
      ctx
    } = this
    ctx.validate(ArticleNewRole);
    let article = await ctx.service.article.create(ctx.request.body);
    ctx.body = {
      result: true,
      ...article
    };
    ctx.status = 200;
  }

  async show() {
    let {
      ctx
    } = this
    let _id = ctx.params.id
    let article = await ctx.model.Article.findById(_id);
    ctx.body = {
      result: true,
      article
    };
    ctx.status = 201;
  }

  async new() {
    let {
      ctx
    } = this
    let columnId = ctx.query.column
    let columnDoc = await ctx.model.Column.findById({
      _id: columnId
    })
    let articleModel = await ctx.model.Model.findById({
      _id: columnDoc.articleModel
    }).populate('fields');
    ctx.body = {
      result: true,
      articleFields: articleModel.fields
    };
    ctx.status = 201;
  }

  async update() {
    let {
      ctx
    } = this
    ctx.validate(ArticleEditRole);
    let article = await ctx.service.article.update(ctx.request.body);
    ctx.body = {
      result: true,
      ...article
    };
    ctx.status = 201;
  }

  async public() {
    let {
      ctx
    } = this
    let article = await ctx.service.article.public(ctx.request.body);
    ctx.body = {
      result: true,
      ...article
    };
    ctx.status = 201;
  }

  async destroy() {
    let {
      ctx
    } = this
    ctx.validate({
      _id: 'string'
    });
    let article = await ctx.service.article.delete(ctx.request.body);
    ctx.body = {
      result: true,
      ...article
    };
    ctx.status = 201;
  }
}

module.exports = ArticleController;