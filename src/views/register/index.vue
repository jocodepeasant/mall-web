<template>
  <div>
    <el-card class="login-form-layout">
      <el-form :model="loginForm"
               :rules="loginRules"
               autoComplete="new-password"
               ref="loginForm"
               label-position="left">
        <!--解决输入框自动填充问题-->
        <input type="password" hidden="hidden"></input>
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">注册中心</h2>
        <el-form-item prop="username">
          <el-input name="username"
                    type="text"
                    autocomplete="off"
                    v-model="loginForm.username"
                    placeholder="请输入用户名">
          <span slot="prefix">
            <svg-icon icon-class="user" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input name="email"
                    type="text"
                    @keyup.enter.native="handleRegister"
                    v-model="loginForm.email"
                    placeholder="请输入邮箱">
          <span slot="prefix">
            <svg-icon icon-class="email" class="color-main"></svg-icon>
          </span>
            <span slot="suffix" @click="sendCode(loginForm.email)">
            <el-button type="primary" size="small" :class="{disabled: !this.canClick}">
              {{content}}
            </el-button>
              </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input name="code"
                    type="text"
                    @keyup.enter.native="handleRegister"
                    v-model="loginForm.code"
                    placeholder="请输入动态码">
            <span slot="prefix">
            <svg-icon icon-class="code" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password"
                    :type="pwdType"
                    @keyup.enter.native="handleRegister"
                    v-model="loginForm.password"
                    placeholder="请输入密码">
          <span slot="prefix">
            <svg-icon icon-class="password" class="color-main"></svg-icon>
          </span>
            <span slot="suffix" @click="showPwd">
            <svg-icon icon-class="eye" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input name="checkPassword"
                    :type="checkPwdType"
                    @keyup.enter.native="handleRegister"
                    v-model="loginForm.checkPassword"
                    placeholder="请再次输入密码">
          <span slot="prefix">
            <svg-icon icon-class="password" class="color-main"></svg-icon>
          </span>
            <span slot="suffix" @click="checkShowPwd">
            <svg-icon icon-class="eye" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>

        <el-form-item style="margin-bottom: 60px;text-align: center">
          <el-button style="width: 45%" type="primary" @click.native.prevent="handleRegister">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="login-center-layout">
  </div>
</template>

<script>
    import {validateAlphabets} from '@/utils/validate';
    import login_center_bg from '@/assets/images/login_center_bg.png'
    import {validateEmail} from '@/utils/validate';

    export default {
        name: 'login',
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('用户名不能为空'))
                }
                if (value.length < 4 || value.length > 15) {
                    callback(new Error('用户名需在4~15位之间'))
                } else {
                    callback()
                }
            };
            const validatePass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('密码不能为空'))
                }
                if (!validateAlphabets(value.substring(0, 1))) {
                    callback(new Error('密码需以字母开头'))
                }
                if (value.length < 6 || value.length > 15) {
                    callback(new Error('密码需在6~15位之间'))
                } else {
                    callback()
                }
            };
            const checkPass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('密码不能为空'))
                }
                if (!validateAlphabets(value.substring(0, 1))) {
                    callback(new Error('密码需以字母开头'))
                }
                if (value.length < 6 || value.length > 15) {
                    callback(new Error('密码需在6~15位之间'))
                }
                if (value != this.loginForm.password) {
                    callback(new Error('两次密码输入不一致'))
                } else {
                    callback()
                }
            };
            const checkEmail = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('邮箱不能为空'))
                }
                if (!validateEmail(value)) {
                    callback(new Error('邮箱格式错误'))
                } else {
                    callback()
                }
            };
            const checkCode = (rule, value, callback) => {
                if (value.length != 6) {
                    callback(new Error('动态码为六位'))
                } else {
                    callback();
                }
            }
            return {
                content: '发送验证码',
                totalTime: 60,
                canClick: true,
                count: "",//倒计时
                loginForm: {
                    username: '',
                    password: '',
                    checkPass: '',
                    email: '',
                    code: '',
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur', validator: validateUsername}],
                    password: [{required: true, trigger: 'blur', validator: validatePass}],
                    checkPassword: [{required: true, trigger: 'blur', validator: checkPass}],
                    email: [{required: true, trigger: 'blur', validator: checkEmail}],
                    code: [{required: true, trigger: 'blur', validator: checkCode}],
                },
                loading: false,
                pwdType: 'password',
                checkPwdType: 'password',
                login_center_bg,
                dialogVisible: false,
                supportDialogVisible: false
            }
        },
        methods: {
            showPwd() {
                if (this.pwdType === 'password') {
                    this.pwdType = ''
                } else {
                    this.pwdType = 'password'
                }
            },
            checkShowPwd() {
                if (this.checkPwdType === 'password') {
                    this.checkPwdType = ''
                } else {
                    this.checkPwdType = 'password'
                }
            },
            handleRegister() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$store.dispatch('Register', this.loginForm).then(() => {
                            this.loading = false;
                            //三秒后跳转
                            this.goGrdoupRecor("/login", 3)
                            this.$message({
                                message: "注册成功，3s后跳转至登录页面",
                                type: "success",
                                duration: 3000
                            })
                            this.$message({
                                message: "该功能暂时停用，创建的用户无任何权限",
                                type: "success",
                                duration: 3000
                            })
                        }).catch(() => {
                            this.loading = false
                        })
                    } else {
                        console.log('参数验证不合法！');
                        return false
                    }
                })
            },
            goGrdoupRecor(path, time) {
                if (!this.timer) {
                    this.count = time;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= time) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                            //跳转的页面写在此处
                            this.$router.push(path)
                        }
                    }, 1000)
                }
            },
            sendCode(email) {
                function checkEmail(email) {
                    let regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                    if (regEmail.test(email)) {
                        return true;
                    } else {
                        return false;
                    }
                }

                if (checkEmail(email)) {
                    if (!this.canClick) return  //改动的是这两行代码
                    this.loading = true;
                    this.$store.dispatch('EmailCode',this.loginForm.email).then(() => {
                        this.loading = false;
                        /*this.$message({
                            message: "验证码发送成功",
                            type: "success",
                            duration: 3000
                        })*/
                    }).catch(() => {
                        this.loading = false
                    })
                    this.canClick = false
                    this.content = this.totalTime + 's后重新发送'
                    let clock = window.setInterval(() => {
                        this.totalTime--
                        this.content = this.totalTime + 's后重新发送'
                        if (this.totalTime < 0) {
                            window.clearInterval(clock)
                            this.content = '重新发送验证码'
                            this.totalTime = 60
                            this.canClick = true  //这里重新开启
                        }
                    }, 1000)
                } else {
                    console.log('参数验证不合法！');
                    return false
                }
            },
            dialogConfirm() {
                this.dialogVisible = false;
                setSupport(true);
            },
            dialogCancel() {
                this.dialogVisible = false;
                setSupport(false);
            },
        }
    }
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;
  }

  .login-title {
    text-align: center;
  }

  .login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }

  .disabled {
    background-color: #ddd;
    border-color: #ddd;
    color: #57a3f3;
    cursor: not-allowed;
  }
</style>
