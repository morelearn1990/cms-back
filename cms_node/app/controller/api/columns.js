'use strict';

const Controller = require('egg').Controller;
const ColumnNewRole = {
  cname: 'string',
  parentColumn: {
    type: 'string',
    required: false
  },
  columnModel: 'string',
  articleModel: 'string',
}
const ColumnEditRole = {
  _id: 'string',
  ...ColumnNewRole
}

class ColumnController extends Controller {
  async index() {
    const {
      ctx
    } = this
    let columns = await ctx.model.Column.find({});
    ctx.body = {
      result: true,
      columns
    }
    ctx.status = 200;
  }

  async create() {
    let {
      ctx
    } = this
    console.log(ctx.request.body)
    // ctx.validate(ColumnNewRole);
    let column = await ctx.service.column.create(ctx.request.body);
    ctx.body = {
      result: true,
      column
    };
    ctx.status = 200;
  }

  async edit() {
    let {
      ctx
    } = this
    let _id = ctx.params.id
    let column = await ctx.model.Column.findById(_id);
    let model = await ctx.model.Model.findById({
      _id: column.columnModel
    }).populate('fields');
    ctx.body = {
      result: true,
      column,
      model
    };
    ctx.status = 201;
  }

  async show() {
    let {
      ctx
    } = this
    let _id = ctx.params.id
    let column = await ctx.model.Column.findById(_id).populate('columnModel');
    ctx.body = {
      result: true,
      column
    };
    ctx.status = 201;
  }

  async new() {
    let {
      ctx
    } = this
    let column = await ctx.model.Column.findById(_id).populate('columnModel');
    ctx.body = {
      result: true,
      column
    };
    ctx.status = 201;
  }

  async update() {
    let {
      ctx
    } = this
    ctx.validate(ColumnEditRole);
    let column = await ctx.service.column.update(ctx.request.body);
    ctx.body = {
      result: true,
      column
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
    let column = await ctx.model.Column.findByIdAndRemove(ctx.request.body._id).exec()
    ctx.body = {
      result: true,
    };
    ctx.status = 201;
  }
}

module.exports = ColumnController;