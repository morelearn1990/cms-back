'use strict';

const Controller = require('egg').Controller;
const ModelFieldNewRole = {
  name: 'string',
  cname: 'string',
  inputType: 'string',
  description: 'string',
}
const ModelFieldEditRole = {
  _id: 'string',
  ...ModelFieldNewRole
}

class ModelFieldController extends Controller {
  async index() {
    const {
      ctx
    } = this
    let modelFields = await ctx.model.ModelField.find({});
    ctx.body = {
      result: true,
      modelFields
    }
    ctx.status = 200;
  }

  async create() {
    let {
      ctx
    } = this
    ctx.validate(ModelFieldNewRole);
    let result = await ctx.service.modelField.create(ctx.request.body);
    ctx.body = {
      result: true,
      ...result
    };
    ctx.status = 200;
  }

  async show() {
    let {
      ctx
    } = this
    let _id = ctx.params.id
    let modelField = await ctx.model.ModelField.findById(_id);
    ctx.body = {
      result: true,
      modelField
    };
    ctx.status = 201;
  }

  async update() {
    let {
      ctx
    } = this
    ctx.validate(ModelFieldEditRole);
    let modelField = await ctx.service.modelField.update(ctx.request.body);
    ctx.body = {
      result: true,
      modelField
    };
    ctx.status = 201;
  }

  async destroy() {
    let {
      ctx
    } = this
    let _id = ctx.params.id
    // let modelField = await ctx.model.ModelField.findByIdAndRemove(ctx.request.body._id).exec()
    ctx.body = {
      result: false,
      message: '暂不允许删除'
    };
    ctx.status = 201;
  }
}

module.exports = ModelFieldController;