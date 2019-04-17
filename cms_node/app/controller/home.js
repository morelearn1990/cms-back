'use strict';
const fs = require('fs')

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index(ctx) {
    let data = {
      title: '测试版',
      des: 'adsfasdfasdf',
      keywords: 'adsfadsfasdf'
    };

    await ctx.render('index', data);
  }
  async column(ctx) {
    let data = {
      title: '栏目',
      des: 'adsfasdfasdf',
      keywords: 'adsfadsfasdf'
    };

    await ctx.render('default_column', data);
  }
  async article(ctx) {
    let data = {
      title: '文章',
      des: 'adsfasdfasdf',
      keywords: 'adsfadsfasdf'
    };

    await ctx.render('default_article', data);
  }
}

module.exports = HomeController;