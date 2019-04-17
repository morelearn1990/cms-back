'use strict';

const Controller = require('egg').Controller;

class InstallController extends Controller {
    async index() {
        const { ctx } = this
        const message = await ctx.service.install.index();
        ctx.body = message
    }
}

module.exports = InstallController;