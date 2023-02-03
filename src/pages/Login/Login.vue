<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" @click="setLoginWay(true)" :class="{on: loginWay}">短信登录</a>
          <a href="javascript:;" @click="loginWay=false" :class="{on: !loginWay}">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
            <!-- 下面根据是否有on 来设置display是none还是block -->
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <!-- 根据computedTime  来显示获取验证码还是已发送 -->
              <!-- 绑定一个类名为 right_phone_number  根据下面返回的true或者是false -->
              <button class="get_verification" v-if="!computedTime" :class="{right_phone_number:rightPhoneNumber}" @click.prevent="getVerifyCode">获取验证码</button>
              <button disabled="disabled" class="get_verification" v-else>已发送({{computedTime}}s)</button>
            </section>
            <section class="login_verification">
              <input type="text" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <!-- 明文和密文是两个input -->
                <input type="password" placeholder="密码" v-model="pwd" v-if="!showPassword">
                <input type="text" placeholder="密码" v-model="pwd" v-else>
                <div class="switch_button" :class="showPassword ? 'on' : 'off'" @click="changePassWordType">
                    <!-- 这里面的right 就是下面添加了一个过度 让小球球移动 -->
                    <div class="switch_circle" :class="{right: showPassword}"></div>
                    <span class="switch_text">{{showPassword?'abc':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <!-- <img ref="captcha" class="get_verification" src="http://localhost:3000/captcha" alt="captcha" @click="getCaptchaCode"> -->
                <img ref="captcha" class="get_verification" src="./images/captcha.svg" alt="captcha" @click="getCaptchaCode">
              </section>
            </section>
          </div>
          <input type="submit" value="登录" class="login_submit" />
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
    <!-- 错误信息 -->
    <!-- closeTip组件内部向外面调用 -->
    <alert-tip v-if="showAlert" @closeTip="closeTip" :alertText="alertText"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {reqCaptchas,accountLogin,mobileCode,phoneLogin,reqUser} from '../../api'
  import AlertTip from '../../components/AlertTip/AlertTip.vue'

  export default {
    data() {
      return {
        loginWay: true, //登录方式，false代表密码登录, true代表短信登陆
        showPassword: false, // 是否显示密码
        computedTime: 0, //倒数记时
        phone: '', //电话号码
        code: '', //短信验证码
        name: '', //用户名
        pwd: '', //密码
        captcha: '', // 验证码
        captchaImg: null, //验证码图片
        showAlert: false, //显示提示组件
        alertText: null, //提示的内容
      }
    },

    computed: {
      //判断手机号码 计算属性 来校验数据格式
      rightPhoneNumber: function () {
        return /^1\d{10}$/.test(this.phone)
      }
    },

    methods: {
      ...mapActions([
        'recordUserInfo',
      ]),
      // 设置登录方式
      setLoginWay(loginWay) {
        this.loginWay = loginWay
      },
      //是否显示密码
      changePassWordType() {
        this.showPassword = !this.showPassword
      },
      // 获取图形验证码
      async getCaptchaCode() {
        // async getCaptchaCode(event) {
        // 可以通过event获取到  但是有一个弊端 就是不能手动调用
        // event.target.src = ''
        this.$refs.captcha.src = 'http://localhost:3000/captcha?time='+new Date()
        // 这个接口的返回值是svg图片 直接用就行了
        // event.target.src = await reqCaptchas(Date.now())
      },

      // 获取短信验证码
      async getVerifyCode() {
        if (this.rightPhoneNumber) {
          this.computedTime = 30
          // 启动倒计时
          this.intervalId = setInterval(() => {
            this.computedTime--
            if (this.computedTime == 0) {
                // 倒计时结束 关掉定时器
                clearInterval(this.intervalId)
            }
          }, 1000)
          //发送短信验证码
          let result = await mobileCode(this.phone)
          if (result.code===1) {    // 验证码发送失败
            // 提示错误信息
            this.showAlertAction(result.msg); 
            // 停止倒计时
            this.stopTimer()
          }
        }
      },

      stopTimer(){
        if(this.computedTime){  // 如果还在倒计时 就停掉
            this.computedTime = 0
            clearInterval(this.intervalId)
            this.intervalId = undefined
        }
      },

      showAlertAction(alertText){
        this.showAlert = true
        this.alertText = alertText
      },

      // 发送登录信息
      async login() {
        let result
        // debugger
        if (this.loginWay) { // 短信登录
          if (!this.phone || !this.rightPhoneNumber) {
            this.showAlertAction('手机号码不正确'); return
          } else if (!(/^\d{6}$/gi.test(this.code))) {
            this.showAlertAction('短信验证码不正确'); return
          } else {
            //手机号短信登录
            result = await phoneLogin(this.phone, this.code);
          }
        } else { // 密码登录 条件都满足了
          if (!this.name) {
            this.showAlertAction('请输入手机号/邮箱/用户名'); return
          } else if (!this.pwd) {
            this.showAlertAction('请输入密码'); return
          } else if (!this.captcha) {
            this.showAlertAction('请输入验证码'); return
          }else{
            //用户名登录
             result = await accountLogin(this.name, this.pwd, this.captcha)
          }
        }
        this.stopTimer()    // 停掉定时器
        console.log(result)
        //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
        if(result.status==='OK') {
            // 将用户的token存到本地
            window.localStorage.setItem('apptoken',result.result.token);
            // 记录下用户信息 保存到vuex的state中
            this.$store.dispatch('loginOptions/getUserInfo')
            // console.log(this.$store.state.loginOptions.userInfo.avatarUrl) 
            this.$router.back() // 然后路由后退
            // 或者直接会到xxx页面
            // this.$router.replace('./profile')
        } else {
            this.showAlertAction(result.message)
            if (!this.loginWay) {   // 如果是密码登录 那我们这里给刷新一下验证码
                this.getCaptchaCode()
            }
        }
      },
      // 关闭提示框
      closeTip() {
        this.showAlert = false
        this.alertText = ''
      }
    },

    components: {
      AlertTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          > a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        > form
          > div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color #000
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s, border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                > .switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)

            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              > a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        > .iconfont
          font-size 20px
          color #999
</style>