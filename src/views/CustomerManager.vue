<template>
  <a-layout :spinner="dataLoadStatus=='loading'">
    <a-layout-header style="background-color: #fff">
      <a-form class="ant-advanced-search-form" :form="searchForm" @submit="handleSearch">
        <a-row :gutter="24">
          <a-col
            v-for="i in 10"
            :key="i"
            :span="8"
            :style="{ display: i < count ? 'block' : 'none' }"
          >
            <a-form-item :label="`Field ${i}`">
              <a-input
                v-decorator="[
                  `field-${i}`,
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Input something!',
                      },
                    ],
                  },
                ]"
                placeholder="placeholder"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit">
              Search
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
              Clear
            </a-button>
            <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggleSearch">
              Collapse <a-icon :type="expand ? 'up' : 'down'" />
            </a>
          </a-col>
        </a-row>
      </a-form>
    </a-layout-header>
    <a-layout-content style="background-color: #fff">
      <a-table :columns="columns" :dataSource="data" v-if="dataLoadStatus=='success'" :pagination="{total:dataPageCount,current:dataPageIndex}">
        <span slot="source" slot-scope="source">
          <span v-if="source == 1">网络营销</span>
          <span v-if="source == 2">电子营销</span>
        </span>
        <span slot="industry" slot-scope="industry, record">
          <span v-if="record.industryName">{{record.industryName}}</span>
          <span v-else>{{industry}}</span>
        </span>
        <span slot="level" slot-scope="level">
          <a-tag v-if="level == 1" color="#2db7f5">普通客户</a-tag>
          <a-tag v-if="level == 2" color="#108ee9">VIP 客户</a-tag>
          <a-tag v-if="level == 3" color="#f50">VVIP 客户</a-tag>
        </span>
        <span slot="action">
          <a href="javascript:;">修改</a>
          <a-divider type="vertical" />
          <a href="javascript:;">删除</a>
        </span>
      </a-table>
      <div v-else-if="dataLoadStatus=='failed'" class="error">
        <a-icon type="exclamation-circle" />
        <h1>数据加载失败</h1>
        <a-button type="link" @click="loadAll">重试</a-button>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import api, { CommonApiError } from "../api";

@Component
export default class CustomerManager extends Vue {
  name = "CustomerManager";

  columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '客户来源',
      dataIndex: 'source',
      key: 'source',
      scopedSlots: { customRender: 'source' },
    },
    {
      title: '客户所属行业',
      dataIndex: 'industry',
      key: 'industry',
      scopedSlots: { customRender: 'industry' },
    },
    {
      title: '客户级别',
      dataIndex: 'level',
      key: 'level',
      scopedSlots: { customRender: 'level' },
    },
    {
      title: '固定电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '手机',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '操作',
      scopedSlots: { customRender: 'action' },
      key: 'action',
    },
  ];
  data = [];
  dataLoadStatus : 'loading'|'success'|'failed' = 'loading';
  dataPageSize = 10;
  dataPageIndex = 1;
  dataPageCount = 0;

  industry = [];

  expand = false;
  searchForm = this.$form.createForm(this, <any>{ name: 'advanced_search' });

  mounted() {
    this.loadAll();
  }

  get count() {
    return this.expand ? 11 : 7;
  }

  handleSearch(e) {
    e.preventDefault();
    this.searchForm.validateFields((error, values) => {
      console.log('error', error);
      console.log('Received values of form: ', values);
    });
  }
  handleReset() {
    this.searchForm.resetFields();
  }

  toggleSearch() {
    this.expand = !this.expand;
  }


  loadAll() {
    this.loadIndustry(() => {
      this.loadCustomerPage(1);
    });
  }
  loadIndustry(callback : () => void) {
    api.getCustomerIndustry().then((value) => {
      this.industry = value.data;
      callback();
    }).catch((e : CommonApiError) => {
      this.dataLoadStatus = 'failed';
      this.$error({
        title: '加载数据失败',
        content: e.errorMessage
      })
    })
  }
  loadCustomerPage(page) {
    if(typeof page === 'undefined') page = this.dataPageIndex - 1;
    api.getCustomerPageable(page, this.dataPageSize).then((value) => {
      this.dataPageIndex = value.data.number + 1;
      this.dataPageCount = value.data.totalPages;

      var findIndustry = (industry_id) => {
        for(var i = 0, c = this.industry.length; i < c; i++) {
          if(this.industry[i].id == industry_id)
            return this.industry[i].name;
        }
        return "";
      }
      for(var i = 0, c = value.data.content.length; i < c; i++) {
        value.data.content[i].key = value.data.content[i].id;
        value.data.content[i].industryName = findIndustry(value.data.content[i].industry);
      }

      this.data = value.data.content;
      this.dataLoadStatus = 'success';
    }).catch((e : CommonApiError) => {
      this.dataLoadStatus = 'failed';
      this.$error({
        title: '加载数据失败',
        content: e.errorMessage
      })
    })
  }


}
</script>

<style>

</style>
