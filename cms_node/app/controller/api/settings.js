'use strict';

const Controller = require('egg').Controller;
const settingNewRole = {
  name: 'names',
  description: 'string',
  value: 'mixed',
  inputType: 'string',
  group: 'number'
}
const settingEditRole = {
  _id: 'string',
  ...settingNewRole
}

class SystemController extends Controller {
  async index() {
    const {
      ctx
    } = this
    let settings = await ctx.model.Setting.find({});
    ctx.body = {
      result: true,
      settings
    }
  }

  async create() {
    let {
      ctx
    } = this
    ctx.validate(settingNewRole);
    let setting = await ctx.service.setting.create(ctx.request.body);
    ctx.body = {
      result: true,
      setting
    };
    ctx.status = 201;
  }

  async show() {
    let {
      ctx
    } = this
    let _id = ctx.params.id
    let setting = await ctx.model.Setting.findById(_id);
    ctx.body = {
      result: true,
      setting
    };
    ctx.status = 201;
  }

  async update() {
    let {
      ctx
    } = this
    console.log(ctx.request.body)
    ctx.validate(settingEditRole);
    let setting = await ctx.service.setting.update(ctx.request.body);
    ctx.body = {
      result: true,
      setting
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
    let setting = await ctx.service.setting.delete(ctx.request.body);
    ctx.body = {
      result: true,
    };
    ctx.status = 201;
  }
}

module.exports = SystemController;