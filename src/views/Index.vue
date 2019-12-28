<template>
  <div>
    <a-row type="flex" justify="center" align="top" :glutter="6">
      <a-col class="gutter-row" :span="6">
        <a-statistic title="客户总数" :value="customerCount" style="margin-right: 50px">
          <template v-slot:suffix>
            <a-icon type="team" />
          </template>
        </a-statistic>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <a-statistic title="我的客户" :value="customerMineCount" style="margin-right: 50px">
          <template v-slot:suffix>
            <a-icon type="user" />
          </template>
        </a-statistic>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <a-statistic title="营效效果" :value="75" style="margin-right: 50px">
          <template v-slot:suffix>
             <span> / 100%</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <a-statistic title="日访问量" :value="1234" style="margin-right: 50px">
          <template v-slot:suffix>
            <a-icon type="global" />
          </template>
        </a-statistic>
      </a-col>
    </a-row>
    <div class="mt-5 mb-5">
      <a-alert
        message="提示：这只是一个示例页面，没有实际功能"
        description="这里是后台首页，只是一个示例，这里没有功能。请点击下方按钮前往 “客户管理” 页面查看主要内容。"
        banner
        closable
      />
    </div>
    <a-row type="flex" justify="center" align="top" :glutter="6">
      <a-col class="text-center" :span="6">
        <a-button type="primary" shape="round" icon="arrow-right" size="large" @click="goManager">客户管理</a-button>
      </a-col>
    </a-row>
    <div class="mt-5 mb-5">
      <a-skeleton avatar :paragraph="{rows: 4}" />
    </div>
  </div>
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
  goManager() {
    this.$router.push({path:'/admin/crm'})
  }
}
</script>

<style>

</style>
