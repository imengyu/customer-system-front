<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view ref="instancePage" />
    </div>
  </a-locale-provider>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State } from 'vuex-class'
import { mapState } from 'vuex';
import md5 from 'md5';
import api, { CommonApiResult, CommonApiError } from './api';
import Const from "./const/Const";
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

@Component
export default class App extends Vue {
  name = "App";
  authInfoLoaded = false;
  reflushAuthInfoTime = Const.AutoFlushAuthInfoTime;
  locale = zhCN;

  @State(state => state.global.lastAuthTime) lastAuthTime : Date;
  @State(state => state.global.lastNeedAuth) lastNeedAuth : number;
  @State(state => state.global.authed) authed : boolean;
  @State(state => state.global.authedUserInfo) authedUserInfo : any;
  @State(state => state.global.authedUserName) authedUserName : string;

  @Watch("lastNeedAuth")
  onLastNeedAuth() {
    this.reloadAuthInfo();
  }

  @Watch("$route")
  onRouteChanged() {
    if(this.authed){ 
      this.loadAuthInfoAutoDely();
    }else{
      this.loadAuthInfo();
    }
  }

  mounted() {
    api.init();
    if(this.authed){ 
      this.loadAuthInfoAutoDely();
    }else{
      this.loadAuthInfo();
    }
  }

  loadAuthInfoAutoDely() {
    if(Math.floor(new Date().getTime() - this.lastAuthTime.getTime()) / 1000 / 60 > this.reflushAuthInfoTime)
      this.loadAuthInfo();
    else {
      this.authInfoLoaded = true;
      this.callChildForAuthInfoLoaded();
    }
  }
  loadAuthInfo(){
    this.reloadAuthInfo(() => {
      this.authInfoLoaded = true;
      this.callChildForAuthInfoLoaded();
    })
  }
  callChildForAuthInfoLoaded() {
    setTimeout(() => {
      if(this.$refs['instancePage'] && typeof (<any>this.$refs['instancePage']).onAuthInfoLoaded == 'function')
        (<any>this.$refs['instancePage']).onAuthInfoLoaded(this.authed, this.authedUserInfo);
    }, 400);
  }
  reloadAuthInfo(callback ?: () => void){

    api.getAuthInfo().then((data : CommonApiResult) => {

      var userId = data.data.userId;

      this.$store.dispatch('global/setAuthed', true);
      this.$store.dispatch('global/setAuthedUserId', userId);
      this.$store.dispatch('global/setLastAuthTime', new Date());

      api.getUserInfo(userId).then((data : CommonApiResult) => {

        var userData = data.data;
        this.$store.dispatch('global/setAuthedUserInfo', userData);
        this.$store.dispatch('global/setAuthedUserName', userData.name);
        
        if(typeof callback === 'function') callback();

      }).catch((err : CommonApiError) =>{
        this.$store.dispatch('global/setAuthedUserInfo', null)
        if(typeof callback === 'function') callback();
      })

    }).catch((err : CommonApiError) => {

      this.$store.dispatch('global/setLastAuthTime', new Date());
      this.$store.dispatch('global/setAuthed', false);
      this.$store.dispatch('global/setAuthedUserId', 0);
      this.$store.dispatch('global/setAuthedUserInfo', null);
      
      if(err.networkError) {
        const h = this.$createElement; 
        this.$message.error(h('div', [
          h('b', { style: { fontWeight: 'bold' } }, '无法连接至服务器'),
          h('br'),
          h('span', {}, '错误信息：'),
          h('span', { style: { color: '#666' } }, err.errorMessage),
          h('br'),
          h('span', {}, '请检查后端 API 服务是否开启')
        ]), 6);
      }

      if(typeof callback === 'function') callback();
    })
  }
}
</script>

<style>

</style>
