import axios from 'axios'
import APIALIAS from '@/utils/RESTful_api'

axios.defaults.baseURL = 'http://localhost:7001';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

function axios_wrapper(name, data, options = {}) {
    let _this = this
    let auth = localStorage.getItem('auth');
    if (name == 'login.in') {
        options = Object.assign({}, options, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic bXlfYXBwOm15X3NlY3JldA=="
            }
        })
    } else {
        options = Object.assign({}, options, {
            headers: {
                Authorization: auth
            }
        })
    }
    return new Promise((resolve, reject) => {
        axios({
            ...APIALIAS[name],
            ...options,
            data
        }).then(res => {
            resolve(res)
        }).catch(err => {
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