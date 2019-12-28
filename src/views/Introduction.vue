<template>
  <div class="text-center about">
    <h1>项目介绍</h1>
    <p>您好，欢迎来到我的项目。</p>

    <h4>关于这个项目</h4>
    <p>本项目是期末实训作业，内容是 Spring MVC 这本书 👇 的最后一章：BOOT 客户系统。</p>
    <img src="../assets/images/i1.jpg" />
    
    <p>它实现的功能大致是这样的 👇 </p>
    <img src="../assets/images/i0.png" /> 
    <p>书上做的示例 👇 （很老、比较丑吧😑）</p>
    <img src="../assets/images/i2.jpg" /> 
    <img src="../assets/images/i3.jpg" />
    <p>以上就是这个系统的<b>大致内容</b>。</p>
    <p>很简单吧，不过书上的功能就是这么简单，做起来也很简单。</p>
    <p>但是！我没有照搬照抄书上的内容，我重新使用新技术做了一个功能差不多的系统。</p>
    <p>原因是什么，因为书上的技术栈实在是太太太太太老了，老的牙都掉光了。</p>
    <p>我的实现方式和书本<b>完全不一样</b>。</p>
    <p>你以为我很厉害？No！我只是一个普通的学生，目前还在努力学习，虽然放在班级里还行，可放到外面和那些大佬比，其实Low的一比。</p>
    <p>我不过是用了当下流行的技术来制作这个项目，没什么了不起的。</p>
    <p>具体是什么技术我在这里不做说明，请自己学习。</p>
    <p>不过作业我是完成了</p>
    <p>总耗时 <span class="text-primary">11.5</span> 小时，我写这篇说明的时间是 <span class="text-primary">2019/12/28 18:21:15</span>。</p>
    <p>成功提前完成任务！🎉🎉🎉🎉🎉 奖励自己一下，吃个大餐🍕🍔！</p>
    <p>不过我还不能放松呢，还有其他任务要完成。</p>

    <h4>关于制作者</h4>

    <p>梦欤（<a href="https://www.imyzc.com" target="_blank">www.imyzc.com</a>），温科院，软件18-1，俞则成</p>
    <p><a-icon type="copyright" /> 2020 梦欤 版权所有</p>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Introduction extends Vue {
  name = "Introduction";


}
</script>

<style lang="scss">
.about{
  padding: 50px;
  font-size: 16px;

  h4 {
    font-size: 25px;
    font-weight: bold;
    color: #0ba6ff;
  }
  p {
    margin: 15px 0;
    font-size: 18px;
  }
  img {
    max-width: 90%;
    border: 1px solid #000;
  }
}
</style>
