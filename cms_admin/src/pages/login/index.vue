<template>
  <div class="main">
    <div class="login-box shadow-3">
      <div class="login-bg">
        <div class="ripple-common ripple-unique1"></div>
        <div class="ripple-common ripple-unique2"></div>
        <div class="ripple-common ripple-unique3"></div>
        <div class="ripple-common ripple-unique4"></div>
        <div class="login-title">
          <h1>CMS 后台管理系统</h1>
        </div>
      </div>
      <div class="login-input">
        <el-form :model="data" :rules="rules" label-width="0px">
          <el-form-item prop="username">
            <el-input v-model="data.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="data.password" type="password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click='login'>登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import hex_sha1 from "@/utils/sha1.js";
var qs = require("qs");
export default {
  data() {
    return {
      data: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      err: ""
    };
  },
  methods: {
    login() {
      if (this.data.account != "" && this.data.password != "") {
        this.toLogin();
      }
    },
    toLogin() {
      let _this = this;
      let loginParam = {
        username: _this.data.username,
        password: _this.data.password,
        grant_type: "password"
      };
      _this
        .$axios_wrapper("login.in", qs.stringify(loginParam),{methods:'POST'})
        .then(res => {
          localStorage.setItem("auth", `Bearer ${res.data.access_token}`);
          _this.$router.push("/");
        })
        .catch(err => {
          err.response.data.error == "invalid_grant"
            ? _this.$message({
                type: "error",
                message: "密码错误"
              })
            : console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #efefef;
}
.login-box {
  width: 500px;
  height: 550px;
  position: absolute;
  left: 0;
  right: 0;
  top: 7%;
  margin: auto;
  border-radius: 5px;
  background-color: #fff;
  overflow: hidden;
  .login-bg {
    width: 100%;
    height: 60%;
    background: linear-gradient(to bottom, #2f7dd6 0%, #fff 100%);
    .ripple-common {
      background-color: rgb(46, 121, 207);
      width: 800px;
      height: 800px;
      position: absolute;
      left: 50%;
      margin-left: -400px;
      top: -600px;
    }
    .ripple-unique1 {
      opacity: 0.6;
      border-top-left-radius: 60%;
      border-top-right-radius: 50%;
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 60%;
      animation: ripple-animation 5s linear infinite;
      z-index: 9;
    }
    .ripple-unique2 {
      opacity: 0.4;
      border-top-left-radius: 40%;
      border-top-right-radius: 50%;
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 40%;
      animation: ripple-animation 10s linear infinite;
      z-index: 8;
    }
    .ripple-unique3 {
      opacity: 0.2;
      border-top-left-radius: 35%;
      border-top-right-radius: 40%;
      border-bottom-left-radius: 40%;
      border-bottom-right-radius: 35%;
      animation: ripple-animation 15s linear infinite;
      z-index: 7;
    }
    .ripple-unique4 {
      opacity: 0.2;
      border-top-left-radius: 40%;
      border-top-right-radius: 35%;
      border-bottom-left-radius: 35%;
      border-bottom-right-radius: 40%;
      animation: ripple-animation 20s linear infinite;
      z-index: 6;
    }
    @keyframes ripple-animation {
      0% {
        transform: rotateZ(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
    .login-title {
      position: relative;
      z-index: 10;
      text-align: center;
      padding-top: 40px;
      color: #074994;
    }
  }
  .login-input {
    width: 100%;
    height: 40%;
    padding: 0 10%;
    .login-btn {
      width: 100%;
    }
  }
}
</style>

