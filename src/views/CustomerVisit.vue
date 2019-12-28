<template>
  <div>
    <a-alert
      message="提示：书本上没有要做这个的内容但是又有这个菜单，所以这里有这样一个空着的页面"
      banner
      closable
      class="mb-4"
    />
    <a-skeleton />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class CustomerVisit extends Vue {
  name = "CustomerVisit";

}
</script>

<style>

</style>
