<template>
  <div class="log-outer">
    <div class="log-bg"></div>
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
