<template>
  <div class="p-4">
    对不起，没有找到你需要的页面！ <span class="text-primary">即将在 {{ sec }} 秒后返回首页</span>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      sec: 6,
      timer: null,
    };
  },
  mounted: function(){
    this.init();
  },
  methods: {
    init() {
      this.timer = setInterval(() => {
        if(this.sec > 0) this.sec --;
        else {
          clearInterval(this.timer);
          this.$router.push({ path: '/' });
        }
      }, 1000)
    }
  }
};
</script>


