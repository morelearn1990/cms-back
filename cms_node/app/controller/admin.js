'use strict';

const fs = require('fs')
const path = require("path")

const Controller = require('egg').Controller;

class AdminController extends Controller {
    async index() {
        const { ctx, app } = this;
        const content = await fs.readFileSync(path.join(this.app.baseDir, './app/public/admin/admin.html'), 'utf-8')
        ctx.response.body = content
    }
}

module.exports = AdminController;