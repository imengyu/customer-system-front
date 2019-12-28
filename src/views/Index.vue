<template>
  <a-row type="flex" justify="center" align="top" :glutter="6">
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box p-3">
        <span>客户总数</span>
        <h1>{{customerCount}}</h1>
      </div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box p-3">
        <span>我的客户</span>
        <h1>{{customerMineCount}}</h1>
      </div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box p-3">
        <span>营效效果</span>
        <h1>75%</h1>
      </div>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <div class="gutter-box p-3">
        <span>日访问量</span>
        <h1>1234</h1>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State } from 'vuex-class'
import api, { CommonApiError } from "../api";

@Component
export default class Index extends Vue {
  name = "Index";

  @State(state => state.global.authed) authed : boolean;
  @State(state => state.global.authedUserInfo) authedUserInfo : any;

  customerCount = 0;
  customerMineCount = 0;

  mounted() {
    this.loadDatas();
  }
  loadDatas() {
    api.getCustomerCount().then((value) => this.customerCount = value.data).catch((e : CommonApiError) => {
      this.$error({ title: '加载数据失败', content: e.errorMessage })
    })
    api.getCustomerCountByUserId(this.authedUserInfo.id).then((value) => this.customerMineCount = value.data).catch((e : CommonApiError) => {
      this.$error({ title: '加载数据失败', content: e.errorMessage })
    })
  }
}
</script>

<style>

</style>
