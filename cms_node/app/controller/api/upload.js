'use strict';

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const pump = require('mz-modules/pump');

class UploadAjaxController extends Controller {
  async upload() {
    let {
      ctx
    } = this
    const stream = await this.ctx.getFileStream();
    let now = new Date();
    let year = now.getFullYear()
    let month = now.getMonth() < 10 ? '0' + now.getMonth() : now.getMonth()
    let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    let time = Date.parse(now)
    let filePath = `app/public/upload/${'' + year + month}/${date}`
    try {
      fs.accessSync(filePath, fs.constants.F_OK | fs.constants.W_OK);
    } catch (error) {
      try {
        fs.accessSync(`app/public/upload/${''+year+month}`, fs.constants.F_OK | fs.constants.W_OK);
      } catch (error) {
        fs.mkdirSync(`app/public/upload/${''+year+month}`);
      }
      fs.mkdirSync(filePath);
    }
    const filename = time + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, filePath, filename);
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    this.ctx.body = {
      url: `http://127.0.0.1:7002/public/upload/${''+year+month}/${date}/` + filename
    };
  }
}

module.exports = UploadAjaxController;