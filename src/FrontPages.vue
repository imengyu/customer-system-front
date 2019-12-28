<template>
  <div class="main">
    <a-layout-header class="header">
      <div class="logo"></div>
      <a-menu
        class="menu"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        v-model="menuSelectKeys" @click="menuClicked"
      >
        <a-menu-item key="1">主页</a-menu-item>
        <a-menu-item key="2">关于这个项目</a-menu-item>
        <a-menu-item key="3">我的博客</a-menu-item>
        <a-menu-item key="4">获取源码</a-menu-item>
        <a-menu-item key="5">关于制作者</a-menu-item>
        <a-menu-item key="6">项目说明</a-menu-item>
      </a-menu>
    </a-layout-header>
    <div class="content-main">
      <router-view/>
    </div>
    <div class="footer" @click="aboutTip">
      &copy; 2020 梦欤 版权所有
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import $ from 'jquery'

@Component
export default class FrontPages extends Vue {
  name = "FrontPages";
  menuSelectKeys = [];

  mounted() {
    this.getMenuDefSelectIndex();
    $('#loading').fadeOut();
  }
  getMenuDefSelectIndex() {
    let path = this.$route.path;
    if(path == '/login') this.menuSelectKeys = ['1'];
    else if(path == '/about') this.menuSelectKeys = ['2'];
    else if(path == '/introduction') this.menuSelectKeys = ['6'];
    return this.menuSelectKeys;
  }
  menuClicked(v : { item, key, keyPath }) {
    switch(v.key){
      case '1': this.$router.push({path:'/'}); break;
      case '2': this.$router.push({path:'/about'}); break;
      case '3': window.open('https://www.imengyu.top'); break;
      case '4': window.open('https://github.com/717021'); break;
      case '5': window.open('https://www.imyzc.com'); break;
      case '6': this.$router.push({path:'/introduction'}); break;
    }
    setTimeout(() => this.getMenuDefSelectIndex(), 800);
  }
  aboutTip() {
    const h = this.$createElement;
    this.$info({
      title: '提示',
      content: h('div', [
        h('span', { style: 'text-ailgn: center; display: block' }, '梦欤'),
        h('span', { style: 'text-ailgn: center; display: block' }, '了解我的更多信息，访问下面链接：'),
        h('a', { style: 'text-ailgn: center' }, 'https://www.imyzc.com'),
      ]),
    })
  }

}
</script>

<style lang="scss">
@import "./assets/scss/scroll";

.main {
  .header {
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
      height: 32px;
      background-image: url('./assets/images/logo-white.svg');
      background-repeat: no-repeat;
      background-position: center;
      margin: 16px;
      color: #fff;
      text-transform: uppercase;
      width: 100px;
      display: inline-block;
    }
    .menu {
      width: calc(100% - 200px);
      display: inline-block;
    }
  }
}
.content-main {
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 60px;

  overflow: hidden;
  overflow-y: scroll;

  @include pc-fix-scrollbar-white();
}
.footer {
  position: absolute;
  padding: 15px;
  text-align: center;
  color: #888;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
  font-size: 14px;
  left: 0;
  right: 0;
  bottom: 0;

  &:hover {
    color: #0088e2;
  }
}
</style>
