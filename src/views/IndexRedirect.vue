<template>
  <div id="app">
    <router-view/>
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

  mounted() {
    this.$router.push({ path: '/login' });
  }
}
</script>

<style>

</style>
