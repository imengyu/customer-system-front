<template>
  <div class="log-outer">
    <div class="log-box authed">
      <h4>{{exitText}}</h4>
      <span>{{exitSubText}}</span>
      <a-button v-if="!exitSending" type="primary" block @click="doRedirectBack">返回首页</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State } from 'vuex-class';
import md5 from 'md5';
import api, { CommonApiError, CommonApiResult } from "../api";

@Component
export default class Logout extends Vue {
  name = "Logout";

  exitText = '正在退出';
  exitSubText = '请稍后';
  exitSending = true;
 
  mounted() {
    this.logout();
  }

  doRedirectBack(){
    if(this.$route.query && this.$route.query.redirect_to) 
      this.$router.push(<string>this.$route.query.redirect_to);
    else 
      this.$router.push('/');
  }

  logout() {
    api.logout().then(() => {
      this.exitSending = false;
      this.$store.dispatch('global/resetAuthStatus');
      this.doRedirectBack();
    }).catch((e : CommonApiError) => {
      this.exitSending = false;
      this.exitText = '无法退出登录';
      this.$store.dispatch('global/requestReloadAuthStatus');
      this.exitSubText = e.errorMessage;
    })
  }

}
</script>

<style lang="scss">
.login-form-forgot {
  float: right;
}
.login-form-button {
  display: block;
  width: 100%;
}
.log-outer {
  position: relative;
  display: flex;
  justify-content: center;
  align-content: flex-start;
}
.log-box {
  position: relative;
  background-color: white;
  padding: 35px 25px;
  border-radius: 6px;
  box-shadow: 0 0 10px 2px rgba(0,0,0,0.1);
  width: 400px;
  margin-top: 35px;

  &.authed {
    height: 400px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    > img {
      margin-bottom: 16px;
    }
    > h4 {
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 18px;
    }
    > span {
      color: #888;
      margin-bottom: 25px;
      font-size: 14px;
    }
  }
  &.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
  }

  .log-title {

    position: relative;
    padding: 0 10px 25px 10px;

    h1 {
      margin: 0;
      font-size: 20px;
      font-weight: bold;
      color: #1058fa;
    }
    span {
      font-size: 13px;
      color: #929292;
    }
  }
  .log-form {
    position: relative;
  }

}

@media only screen and (max-width: 768px) {
  .log-box {
    margin-top: 25px;
    width: 70%;
  }
}

@media only screen and (max-width: 425px) {
  .log-box {
    margin-top: 15px;
    width: 90%;
  }
}
</style>
