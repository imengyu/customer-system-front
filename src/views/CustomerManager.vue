<template>
  <a-layout :spinner="dataLoadStatus=='loading'">
    <a-layout-header style="background-color: #fff; padding: 0;">
      <a-form :form="searchForm" layout="inline" @submit="handleSearch">
        <a-form-item label="客户名称">
          <a-input />
        </a-form-item>
        <a-form-item label="客户来源">
          <a-select style="width: 120px" >
            <a-select-option :value="1">网络营销</a-select-option>
            <a-select-option :value="2">电子营销</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="所属行业">
          <a-select style="width: 120px" :loading="dataLoadStatus=='loading'">
            <a-select-option v-for="(industryItem,index) in industry" :key="index" :value="industryItem.id">{{industryItem.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="客户级别">
          <a-select style="width: 120px" >
            <a-select-option :value="1">普通客户</a-select-option>
            <a-select-option :value="2">VIP 客户</a-select-option>
            <a-select-option :value="3">VVIP 客户</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">
            搜索
          </a-button>
          <a-button html-type="reset" class="ml-2">
            清除
          </a-button>
        </a-form-item>
      </a-form>
    </a-layout-header>
    <a-layout-content style="background-color: #fff">
      <a-button type="primary" class="mb-3" @click="onAddNewCustomer"><a-icon type="plus" />添加客户</a-button>
      <a-table :columns="columns" :dataSource="data" v-if="dataLoadStatus=='success'" :pagination="false">
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
        <span slot="action" slot-scope="industry, record">
          <a href="javascript:;" title="修改记录" @click="onEditCustomer(record)">修改</a>
          <a-divider type="vertical" />
          <a href="javascript:;" title="删除记录" @click="onDeleteCustomer(record)">删除</a>
        </span>
      </a-table>
      <a-pagination
        class="mt-3"
        v-if="dataLoadStatus=='success'||dataLoadStatus=='loading'" 
        showSizeChanger
        @change="onPageChanged"
        @showSizeChange="onShowSizeChange"
        :pageSize.sync="dataPageSize"
        v-model="dataPageIndex"
        :total="dataAllCount"
      />
      <div v-else-if="dataLoadStatus=='failed'" class="error">
        <a-icon type="exclamation-circle" />
        <h1>数据加载失败</h1>
        <a-button type="link" @click="loadAll">重试</a-button>
      </div>
    </a-layout-content>
    <a-modal :title="(editingIsNew?'添加':'编辑') + '客户'" v-model="editingData" 
      @ok="handleEditOk" @cancel="handleEditCancel" okText="保存" cancelText="取消" :maskClosable="false"
      :confirmLoading="editingSubmiting" :width="600" :destroyOnClose="false">
      <a-form :form="editForm" :layout="'horizontal'">
        <a-form-item label="客户名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
          <a-input
            v-decorator="[
              'name', 
              { rules: [{ required: true, message: '请输入客户名称 !' }], },
            ]"
          />
        </a-form-item>
        <a-form-item label="客户来源" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
          <a-select 
            style="width: 100%"
            v-decorator="[
              'source',
              { rules: [{ required: true, message: '请选择客户来源!' }] },
            ]"
            placeholder="请选择客户来源"
          >
            <a-select-option :value="1">网络营销</a-select-option>
            <a-select-option :value="2">电子营销</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="所属行业" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
          <a-select 
            style="width: 100%"
            v-decorator="[
              'industry',
              { rules: [{ required: true, message: '请选择客户所属行业!' }] },
            ]"
            placeholder="请选择客户所属行业"
          >
            <a-select-option v-for="(industryItem,index) in industry" :key="index" :value="industryItem.id">{{industryItem.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="客户级别" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
          <a-select 
            style="width: 100%"
            v-decorator="[
              'level',
              { rules: [{ required: true, message: '请选择客户级别!' }] },
            ]"
            placeholder="请选择客户级别"
          >
            <a-select-option :value="1">普通客户</a-select-option>
            <a-select-option :value="2">VIP 客户</a-select-option>
            <a-select-option :value="3">VVIP 客户</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="联系人" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
          <a-input
            v-decorator="[
              'linkman', 
              { rules: [{ required: true, message: '请输入联系人名称 !' }], },
            ]"
          />
        </a-form-item>
        <a-form-item label="固定电话" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
          <a-input
            v-decorator="[
              'phone', 
              { rules: [{ required: false }], },
            ]"
          />
        </a-form-item>
        <a-form-item label="移动电话" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
          <a-input
            v-decorator="[
              'mobile', 
              { rules: [{ required: false }], },
            ]"
          />
        </a-form-item>
        <a-form-item label="邮政编码" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
          <a-input
            v-decorator="[
              'zipcode', 
              { rules: [{ required: false }], },
            ]"
          />
        </a-form-item>
        <a-form-item label="联系地址" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
          <a-input
            v-decorator="[
              'address', 
              { rules: [{ required: false }], },
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State } from 'vuex-class'
import api, { CommonApiError } from "../api";
import { setTimeout } from "timers";

@Component
export default class CustomerManager extends Vue {
  name = "CustomerManager";

  editingData = false;
  editingIsNew = false;
  editingSubmiting = false;
  editingObject = null;

  formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
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
  dataAllCount = 0;

  @State(state => state.global.authed) authed : boolean;
  @State(state => state.global.authedUserInfo) authedUserInfo : any;

  industry = [];

  isSearchMode = false;

  expand = false;
  searchForm = null;
  editForm = null;

  searchValues = {};

  mounted() {
    this.searchForm = this.$form.createForm(this, <any>{ name: 'advanced_search' });
    this.editForm = this.$form.createForm(this, <any>{ name: 'edit_object' });
    this.loadAll();
  }

  get count() {
    return this.expand ? 11 : 7;
  }

  handleSearch(e) {
    e.preventDefault();
    this.searchForm.validateFields((error, values) => {
      if(!error) {
        this.searchValues = values;
        this.loadCustomerPage(1);
      }
    });
  }
  handleReset() {
    this.searchForm.resetFields();
    this.searchValues = {};
    this.loadCustomerPage(1);
  }

  handleEditOk() {
    let that = this;
    that.editingSubmiting = true;
    return new Promise((resolve, reject) => {
      this.editForm.validateFields((error, values) => {
        if(error) reject(error);
        else {
          if(this.editingIsNew) {
            //数据处理
            let valueSolved = that.editingObject, i = 0, k = Object.keys(values);
            for(let c = k.length; i < c; i++) 
              that.editingObject[k[i]] = values[k[i]];
            api.addCustomer(valueSolved).then((value) => {
              that.$message.info('新增客户成功！');
              that.handleEditCancel();
              that.loadCustomerPage(undefined);
              that.editingSubmiting = false;
              resolve();
            }).catch((e : CommonApiError) => {
              that.editingSubmiting = false;
              that.$message.error('新增客户失败！' + e.errorMessage);
              resolve();
            })
          } else {
            let valueSolved = that.editingObject, i = 0, k = Object.keys(values);
            for(let c = k.length; i < c; i++) 
              that.editingObject[k[i]] = values[k[i]];
            api.addCustomer(valueSolved).then((value) => {
              that.$message.info('修改客户成功！');
              that.handleEditCancel();
              that.loadCustomerPage(undefined);
              that.editingSubmiting = false;
              resolve();
            }).catch((e : CommonApiError) => {
              that.$message.error('修改客户失败！' + e.errorMessage);
              that.editingSubmiting = false;
              resolve();
            })
          }
        }
        resolve();
      });
    }).catch(() => console.log('Oops errors!'));
  }
  handleEditCancel() {
    this.editingData = false;
    this.editingIsNew = false;
    this.editingObject = null;
    this.editingSubmiting = false;
  }

  onPageChanged(current, pageSize) {
    this.dataPageIndex = current;
    this.dataPageSize = pageSize;
    this.loadCustomerPage(undefined);
  }
  onShowSizeChange(current, pageSize) {
    this.dataPageIndex = current;
    this.dataPageSize = pageSize;
    this.loadCustomerPage(undefined);
  }

  updateEditFromValues() {
    setTimeout(() => {
      this.editForm.setFieldsValue({
        'industry': this.editingObject.industry,
        'level': this.editingObject.level,
        'linkman': this.editingObject.linkman,
        'mobile': this.editingObject.mobile,
        'name': this.editingObject.name,
        'phone':  this.editingObject.phone,
        'source': this.editingObject.source,
      })
    }, 0);
  }

  onAddNewCustomer() {
    this.editingData = true;
    this.editingIsNew = true;
    this.editingObject = {
      id: 0,
      industry: 1,
      level: 1,
      linkman: "",
      mobile: "",
      name: "",
      phone:  "",
      source: 1,
      userId: this.authedUserInfo.id
    };
    this.editingSubmiting = false;
    this.updateEditFromValues();
  }
  onEditCustomer(record) {
    this.editingData = true;
    this.editingIsNew = false;
    this.editingObject = record;
    this.editingSubmiting = false;
    this.updateEditFromValues();
  }
  onDeleteCustomer(record) {
    let that = this;
    this.$confirm({
      title: '你真的要删除这个客户吗?',
      content: '请注意，删除客户后将不能恢复',
      okText: '删除',
      okType: 'danger',
      cancelText: '不删除',
      onOk() {
        return new Promise((resolve, reject) => {
          api.deleteCustomerById(record.id).then((value) => {
            that.$message.info('删除客户成功！');
            that.loadCustomerPage(undefined);
            resolve();
          }).catch((e : CommonApiError) => {
            that.$message.error('删除客户失败：' + e.errorMessage);
            reject(e.errorMessage);
          })
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }

  toggleSearch() {
    this.expand = !this.expand;
  }
  makeSearchString() {
    let k = Object.keys(this.searchValues), s = '';
    for(var i = 0, c = k.length; i < c; i++) {
      
    }
    return s;
  }

  loadAll() {
    this.loadIndustry(() => {
      this.loadCustomerPage(1);
    });
  }
  loadIndustry(callback : () => void) {
    this.dataLoadStatus = 'loading';
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
    this.dataLoadStatus = 'loading';
    api.getCustomerPageable(page, this.dataPageSize).then((value) => {
      this.dataPageIndex = value.data.number + 1;
      this.dataPageCount = value.data.totalPages;
      this.dataAllCount = value.data.totalElements;

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
