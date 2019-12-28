<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State } from 'vuex-class'
import md5 from 'md5';
import { mapState } from 'vuex';

@Component
export default class IndexRedirect extends Vue {
  name = "IndexRedirect";

  mounted() {
    let first = localStorage.getItem('first');
    if(!first || first == ''){
      this.$info({
        title: '您好，欢迎来到我的项目',
        content: '看起来您是初次访问此项目，您想不想看一看项目说明文档？',
        okText: '好的，看看你的项目是怎么样的情况',
        cancelText: '暂时不看了，我想直接看项目做的怎么样',
        onOk() {
          localStorage.setItem('first', 'not-first');
          this.$router.push({ path: '/introduction' });
        },
        onCancel() {
          localStorage.setItem('first', 'not-first');
          this.$router.push({ path: '/login' });
        }
      })
    } else this.$router.push({ path: '/login' });
  }
}
</script>

<style>

</style>
