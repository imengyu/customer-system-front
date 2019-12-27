<template>
  <div class="text-center about">
    <h1>关于这个项目</h1>
    <p>按照书上的要求完成的一个项目 Demo 。</p>
    <p>书本上的技术太古老，才不抄它。</p>
    <p>本项目使用了新技术制作。</p>
    <p>想查看源码请点击上方按钮。</p>
    <p></p>
    <img src="../assets/images/g.png" />
    
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
