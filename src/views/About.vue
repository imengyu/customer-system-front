<template>
  <div class="text-center about">
    <img src="../assets/images/i0.png" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component 
export default class About extends Vue {
  name = "About";



}
</script>

<style>
.about{
  padding: 50px;
  font-size: 16px;
}
</style>
