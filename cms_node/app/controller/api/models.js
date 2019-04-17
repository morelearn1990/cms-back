'use strict';
const modelNewRole = {
  name: 'words',
  cname: 'string',
  type: 'words',
  description: 'string',
  fields: {
    type: 'array',
    itemType: 'object'
  }
}
const modelEditRole = {
  _id: 'string',
  ...modelNewRole
}

const Controller = require('egg').Controller;

class ModelController extends Controller {
  async index() {
    const {
      ctx
    } = this
    let modelDocs = await ctx.model.Model.find();
    ctx.body = {
      result: true,
      modelDocs
    }
  }

  async create() {
    let {
      ctx
    } = this
    console.log(ctx.request.body)
    ctx.validate(modelNewRole);

    let accessToken = ctx.request.headers.authorization.split(' ')[1]
    let user = await ctx.model.OauthToken.find({
      accessToken
    }).populate('user').exec()
    ctx.request.body.builder = user.cname
    let result = await ctx.service.model.create(ctx.request.body);
    ctx.body = {
      result: true,
      ...result
    };
    result.result ? ctx.status = 201 : ctx.status = 500
  }

  async show() {
    let {
      ctx
    } = this
    let _id = ctx.params.id
    let model = await ctx.model.Model.findById(_id).populate('fields');
    ctx.body = {
      result: true,
      model
    };
    ctx.status = 201;
  }

  async update() {
    let {
      ctx
    } = this
    ctx.validate(modelEditRole);
    let model = await ctx.service.model.update(ctx.request.body);
    ctx.body = {
      result: true,
      model
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
    let result = await ctx.service.model.delete(ctx.request.body);
    ctx.body = {
      result
    };
    ctx.status = 201;
  }
}

module.exports = ModelController;