<template>
  <div id="app">
    <router-view/>
    <a-modal
      title="您好，欢迎来到我的项目"
      :visible="showFirstTip"
    >
      <p>看起来您是初次访问此项目，您想不想看一看项目说明文档？</p>
      <template slot="footer">
        <a-button key="back" class="m-0" @click="handleFirstTipCancel" block>暂时不看了，我想直接看项目做的怎么样</a-button>
        <a-button key="submit" class="ml-0 mt-2" type="primary" @click="handleFirstTipOk" block>好的，看看你的项目是怎么样的情况</a-button>
      </template>
    </a-modal>
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

  showFirstTip = false;

  handleFirstTipOk() {
    localStorage.setItem('first', 'not-first');
    this.showFirstTip = false;
    this.$router.push({ path: '/introduction' });
  }
  handleFirstTipCancel() {
    localStorage.setItem('first', 'not-first');
    this.showFirstTip = false;
    this.$router.push({ path: '/login' });
  }
  mounted() {
    let first = localStorage.getItem('first');
    if(!first || first == '') this.showFirstTip = true;
    else this.$router.push({ path: '/login' });
  }
}
</script>

<style>

</style>
