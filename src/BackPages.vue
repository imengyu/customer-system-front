<template>
  <a-layout class="admin-main">
    <a-layout-sider collapsible v-model="collapsed">
      <div class="logo"></div>
      <a-menu theme="dark" mode="inline" v-model="menuSelectKeys" @click="menuClicked">
        <a-menu-item key="1">
          <a-icon type="home" />
          <span>后台首页</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="user" />
          <span>客户管理</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="user-add" />
          <span>客户拜访</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="setting" />
          <span>系统设置</span>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="arrow-left" />
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="main">
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <a-dropdown>
          <div class="admin-head">
            <user-head v-if="authed && authedUserInfo" :src="authedUserInfo.head_img"></user-head>
            <span v-if="authed && authedUserInfo">{{authedUserInfo.name}}</span>
          </div>
          <a-menu slot="overlay">
            <a-menu-item>
              <router-link to="/admin/setting">系统设置</router-link>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">个人中心</a>
            </a-menu-item>
            <a-menu-item>
              <router-link to="/logout">退出登录</router-link>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px', marginBottom: '10px' }"
      >
        <router-view v-if="authInfoLoaded" />
      </a-layout-content>
      <a-layout-footer style="text-align: center; padding: 10px;padding-top: 0;">
        © 2020 梦欤 版权所有
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State } from 'vuex-class'
import UserHead from './components/UserHead.vue';
import $ from 'jquery'

@Component(<any>{
  components: {
    'user-head': UserHead
  }
})
export default class BackPages extends Vue {
  name = "BackPages";
  collapsed = false;

  @State(state => state.global.authed) authed : boolean;
  @State(state => state.global.authedUserInfo) authedUserInfo : any;
  @State(state => state.global.authedUserName) authedUserName : any;

  menuSelectKeys = [];
  authInfoLoaded = false;

  onAuthInfoLoaded(authed : boolean) {
    if(!authed) {
      $('#loading').fadeIn()
      this.$router.push({ path: '/login?redirect_to=' + this.$route.path })
    }else{
      this.authInfoLoaded = true;
      $('#loading').fadeOut();
    }
  }

  mounted() {
    this.getMenuDefSelectIndex();
  }

  @Watch("$route")
  onRouteChanged() {
    this.getMenuDefSelectIndex();
  }

  getMenuDefSelectIndex() {
    let path = this.$route.path;
    if(path == '/admin/') this.menuSelectKeys = ['1'];
    else if(path == '/admin/crm') this.menuSelectKeys = ['2'];
    else if(path == '/admin/visitor') this.menuSelectKeys = ['3'];
    else if(path == '/admin/setting') this.menuSelectKeys = ['4'];

    return this.menuSelectKeys;
  }
  menuClicked(v : { item, key, keyPath }) {
    if(v.key == 5) {
      let that = this;
      this.$confirm({
        title: '您想要退出登录吗?',
        okText: '退出登录',
        cancelText: '不退出',
        onOk() { that.$router.push({ path: '/logout' }) },
        onCancel() { that.getMenuDefSelectIndex() },
      });
    }else {
      switch(v.key){
        case '1': this.$router.push({path:'/admin/'}); break;
        case '2': this.$router.push({path:'/admin/crm'}); break;
        case '3': this.$router.push({path:'/admin/visitor'}); break;
        case '4': this.$router.push({path:'/admin/setting'}); break;
      }
    }
  } 

}
</script>

<style lang="scss">

.admin-main {

  position: relative;
  height: 100%;

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    :hover {
      color: #1890ff;
    }
  }
  .logo {
    height: 32px;
    background-image: url('./assets/images/logo-white.svg');
    background-repeat: no-repeat;
    background-position: center;
    margin: 16px;
    color: #fff;
    text-transform: uppercase;
  }

  .admin-head {
    float: right;
    margin-right: 30px;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 14px;
      font-weight: bold;
      margin-left: 10px;
      user-select: none;
    }
    img {
      width: 32px;
      height: 32px;
      cursor: pointer;
    }
  }
}
</style>

