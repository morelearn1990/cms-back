'use strict';

let userNewRole = {
  name: 'string',
  cname: 'string',
  model: 'string'
}
let userEditRole = {
  _id: 'string',
  ...userNewRole
}

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const {
      ctx
    } = this
    const userDocs = await ctx.model.User.find({}).populate('model');
    ctx.body = {
      result: true,
      userDocs
    }
  }

  async create() {
    let {
      ctx
    } = this
    ctx.validate(userNewRole);
    let userDoc = await ctx.service.user.create(ctx.request.body);
    ctx.body = {
      result: true,
      userDoc
    };
    ctx.status = 201;
  }

  async show() {
    let {
      ctx
    } = this
    let _id = ctx.params.id
    let user = await ctx.model.User.findById(_id);
    ctx.body = {
      result: true,
      user
    };
    ctx.status = 201;
  }

  async update() {
    let {
      ctx
    } = this
    ctx.validate(userEditRole);
    let result = await ctx.service.user.update(ctx.request.body);
    ctx.body = {
      ...result
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
    let result = await ctx.service.user.delete(ctx.request.body);
    ctx.body = {
      ...result
    };
    ctx.status = 201;
  }
}

module.exports = UserController;