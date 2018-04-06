import axios from 'axios'
import APIALIAS from '@/utils/RESTful_api'

axios.defaults.baseURL = 'http://localhost:7001';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

function axios_wrapper(name, data, options = {}) {
  let _this = this
  let auth = localStorage.getItem('auth');
  let api = Object.assign({}, APIALIAS[name]);
  name == 'login.in' ?
    options = Object.assign({}, options, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic bXlfYXBwOm15X3NlY3JldA=="
      }
    }) :
    options = Object.assign({}, options, {
      headers: {
        Authorization: auth
      }
    });

  //匹配到 :id 之后将 data._id 值拼接到 url 上，并在后台获取到 id 用于 RESTful 查询、修改、删除。
  //如果匹配到 :id 且 data._id 不存在则需要返回一个错误
  (/:id/.test(api.url) && data._id) ? api.url = api.url.replace(/\:id/, data._id): '';
  return (/:id/.test(api.url) && !data._id) ? new Error('缺少 id 字段') : new Promise((resolve, reject) => {
    axios({
      ...api,
      ...options,
      data
    }).then(res => {
      res.data.reslut === false ? reject(res) : resolve(res)
    }).catch(err => {
      _this.err = err.response.toString()
      console.log(err.response)
      if (err.response.data.error == 'invalid_token' || err.response.data.error == 'invalid_request') {
        _this.$message({
          type: 'error',
          message: '请登录~~~'
        })
        _this.$router.push('/login')
      } else if (err.response.data.code == 'invalid_param') {
        _this.$message({
          type: 'error',
          message: '表单类型错误，请按表单要求填写'
        })
      } else {
        _this.$message({
          type: 'error',
          message: '服务错误'
        })
      }
      reject(err)
    })
  })
}

function install(Vue) {
  Vue.prototype.$axios_wrapper = axios_wrapper
}

export default install;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
}
