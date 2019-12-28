<template>
  <div>
    <a-alert
      message="提示：这只是一个示例设置页面，这个页面没有功能"
      banner
      closable
      class="mb-4"
    />
    <a-skeleton avatar :paragraph="{rows: 4}" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Settings extends Vue {
  name = "Settings";

}
</script>

<style>

</style>
