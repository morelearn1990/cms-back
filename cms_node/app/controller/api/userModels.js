'use strict';

const Controller = require('egg').Controller;
const userModelNewRole = {
  name: 'string',
  cname: 'string',
  operationPermissions: {
    type: 'array',
    itemType: 'string'
  }
}
const userModelEditRole = {
  _id: 'string',
  ...userModelNewRole
}

class UserModelController extends Controller {
  async index() {
    const {
      ctx
    } = this
    let userModelDocs = await ctx.model.UserModel.find({}).populate('operationPermissions');
    ctx.body = {
      result: true,
      userModelDocs
    };
  }

  async create() {
    let {
      ctx
    } = this
    ctx.validate(userModelNewRole);
    let userModel = await ctx.service.userModel.create(ctx.request.body);
    ctx.body = {
      result: true,
      userModel
    };
    ctx.status = 201;
  }

  async show() {
    let {
      ctx
    } = this
    let _id = ctx.params.id
    let userModel = await ctx.model.UserModel.findById(_id);
    ctx.body = {
      result: true,
      userModel
    };
    ctx.status = 201;
  }

  async update() {
    let {
      ctx
    } = this
    ctx.validate(userModelEditRole);
    let userModel = await ctx.service.userModel.update(ctx.request.body);
    ctx.body = {
      result: true,
      userModel
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
    let user = await ctx.service.userModel.delete(ctx.request.body);
    ctx.body = {
      result: true,
    };
    ctx.status = 201;
  }
}

module.exports = UserModelController;