<template>
  <img class="user-head" :src="srcSolved" @error="onSrcError" />
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import CommonUtils from "../utils/CommonUtils";

@Component
export default class UserHead extends Vue {

  @Prop({default:''}) src : string;

  srcSolved : string = '';
  errCaused = true;

  mounted() {
    this.loadSrc();
  }

  loadSrc() {
    if(CommonUtils.isNullOrEmpty(this.src)) this.srcSolved = require('../assets/images/head-default.png');
    else this.srcSolved = location.origin + '/' + this.src;
  }

  @Watch('src')
  onSrcChaned(newV) {
    this.errCaused = false;
    if(newV) this.loadSrc();
  }
  onSrcError() {
    if(!this.errCaused) {
      this.errCaused = true;
      this.srcSolved = require('../assets/images/head-error-clear.png');
    }
  }

}
</script>

<style lang="scss">
.user-head {
  border-radius: 50%;
  width: 90px;
  height: 90px;
}
</style>

