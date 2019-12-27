<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State } from 'vuex-class'
import { mapState } from 'vuex';
import md5 from 'md5';
import api, { CommonApiResult, CommonApiError } from './api';
import Const from "./const/Const";

@Component
export default class App extends Vue {
  name = "App";
  authInfoLoaded = false;
  reflushAuthInfoTime = Const.AutoFlushAuthInfoTime;

  @State(state => state.global.lastAuthTime) lastAuthTime : Date;
  @State(state => state.global.lastNeedAuth) lastNeedAuth : number;
  @State(state => state.global.authed) authed : boolean;
  @State(state => state.global.authedUserInfo) authedUserInfo : any;
  @State(state => state.global.authedUserName) authedUserName : string;

  @Watch("lastNeedAuth")
  onLastNeedAuth() {
    this.reloadAuthInfo();
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

      }).catch((err : CommonApiError) => this.$store.dispatch('global/setAuthedUserInfo', null))

    }).catch((err : CommonApiError) => {

      this.$store.dispatch('global/setLastAuthTime', new Date());
      this.$store.dispatch('global/setAuthed', false);
      this.$store.dispatch('global/setAuthedUserId', 0);
      this.$store.dispatch('global/setAuthedUserInfo', null);

      if(err.networkError) this.$message.error(err.errorMessage);
    })
  }
}
</script>

<style>

</style>
