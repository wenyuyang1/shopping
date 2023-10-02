<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input
            class="inp"
            maxlength="11"
            v-model="phoneNumber"
            @blur="validPhone"
            placeholder="请输入手机号码"
            type="text"
          />
        </div>
        <div class="form-item">
          <input
            class="inp"
            maxlength="4"
            v-model="captcha.input"
            @blur="validCaptcha"
            placeholder="请输入图形验证码"
            type="text"
          />
          <img
            v-if="captcha.picURL"
            :src="captcha.picURL"
            @click="getCaptcha"
          />
        </div>
        <div class="form-item">
          <input
            class="inp"
            placeholder="请输入短信验证码"
            maxlength="6"
            type="text"
            v-model="SMS.SMSCode"
          />
          <button @click="getSMS" ref="SMSButton">
            {{
              SMS.second === SMS.totalSecond
                ? "获取验证码"
                : `重新获取(${SMS.second})`
            }}
          </button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { getCaptcha, getSMS, getLogin } from "@/api/login.js";
import { SET_TOKEN } from "@/utils/storage";
export default {
  name: "user-login",

  // components: {},
  data() {
    return {
      phoneNumber: "",
      // 图形验证码
      captcha: {
        // 图片地址和标记
        picURL: "",
        picKey: "",
        // 输入内容
        input: "",
      },
      // sms 短信
      SMS: {
        // 短信验证码输入值
        SMSCode: "",
        totalSecond: 60,
        second: 60,
        timer: null,
      },
    };
  },
  methods: {
    //#region 依次验证手机，图形验证码，sms的格式是否正确
    validPhone() {
      if (!/^1[3-9]\d{9}$/.test(this.phoneNumber)) {
        this.$toast("请输入正确的手机号");
        return false;
      } else if (this.captcha.picURL === "") {
        this.getCaptcha();
      }
      return true;
    },
    validCaptcha() {
      if (!/^\w{4}$/.test(this.captcha.input)) {
        this.$toast("请输入正确的图形验证码");
        return false;
      }
      return true;
    },
    validSMS() {
      if (!/^\d{6}$/.test(this.SMS.SMSCode.toUpperCase())) {
        this.$toast("请输入正确的短信验证码");
        return false;
      }
      return true;
    },
    // #endregion
    async getCaptcha() {
      const {
        data: { base64, key },
      } = await getCaptcha();

      this.$toast("更新验证码成功");

      this.captcha.picURL = base64;
      this.captcha.picKey = key;
    },
    async getSMS() {
      //  需要手机号和图像验证码同时合格
      if (!this.validPhone() || !this.validCaptcha()) {
        return;
      } else {
        let res = await getSMS(
          this.captcha.input,
          this.captcha.picKey,
          this.phoneNumber
        );
        console.log(res);
        this.$toast("短信验证码发送成功");

        if (res.status === 200) {
          // 发送短信按钮不可点击
          this.$refs.SMSButton.disabled = true;
          this.SMS.timer = setInterval(() => {
            this.SMS.second--;
            if (this.SMS.second < 1) {
              // 60s后，发送短信按钮可点击
              this.$refs.SMSButton.disabled = false;
              // 重置data数据下次计时
              this.SMS.second = this.SMS.totalSecond;
              this.$refs.SMSButton.style.color = "rgb(220, 171, 106)";
              clearInterval(this.SMS.timer);
              return;
            }
          }, 1000);
          setTimeout(() => {
            this.$refs.SMSButton.style.color = "rgba(51,51,51,0.4)";
          }, 1000);
        } else {
          this.$toast("短信验证码发送失败");
          return;
        }
      }
    },
    async login() {
      // 验证 验证码手机号
      if (this.validPhone() && this.validCaptcha() && this.validSMS()) {
        let res = await getLogin(this.SMS.SMSCode, this.phoneNumber);
        console.log(res);
        // this.$toast("登录成功");    在request的请求拦截器中配置了loading所以不能再配置toast会覆盖
        this.$store.commit("user/setUserInfo", res.data);
        SET_TOKEN(res.data);
        let url = this.$route.query.backUrl || "/";
        this.$router.replace(url);
      } else {
        this.$toast("登录失败");
        return;
      }
    },
  },
  destroyed() {
    clearInterval(this.SMS.timer);
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
@/api/user.js
