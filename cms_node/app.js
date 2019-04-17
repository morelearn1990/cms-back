const utils = require('./app/utils/utils.js')

module.exports = app => {
  app.beforeStart(async () => {});
  app.validator.addRule('words', /^[a-z]+$/);
  app.validator.addRule('names', /[a-z]+_*[0-9]*/);
  app.validator.addRule('mixed', (rule, value) => {
    if (value == null || value == undefined || value == NaN) {
      return '字段错误，不能为空'
    }
  });
}