<script setup>
import {ref, onMounted} from 'vue'
//通过这个来引用别的组件
import clickButton from './components/clickButton.vue';

// 引用的.js文件中使用template需要配置构建工具支持模板编译
// 在vite.config.js的 alias: {} 中加入以下配置
// 'vue': 'vue/dist/vue.esm-bundler.js' // 关键配置
import jsClickButton from './components/jsClickButton.js';
const text = ref('这是组件基础文本')
const jsButtonRef = ref(null);
onMounted(()=>{
  console.log(jsButtonRef.value);
})

// 关于Props
import aboutProps from './components/aboutProps.vue';
import aboutPropsTypeScript from './components/aboutPropsTypeScript';

</script>

<template>
  <h1>{{ text }}</h1>
  <!-- 
  值得一提的是每个组件都是独立的
  每一个组件都维护着自己的状态，是不同的 count
  这是因为每当你使用一个组件，就创建了一个新的实例。 
  -->
  <!--
    组件实例是 Vue 中最小可复用的功能单元
    每个实例自带数据和方法，彼此独立又协同工作。
  -->
  <clickButton class="red"/>
  <clickButton class="blue"/>
  <br />
  <jsClickButton ref="jsButtonRef" />
  <!-- 在单文件组件中
  推荐为子组件使用 PascalCase 的标签名(也就是驼峰命名)
  以此来和原生的 HTML 元素作区分。 -->


  <!-- 
    注意：这里可以传入数字也可以传入字符串
    但是如果没有在字符串两边加上''的话
    vue会将其识别为一个JavaScriptd的表达式
    "这是aboutProps组件的标题"被当作 ​变量名​ 而非字符串
    若该变量未定义，则传递 undefined，导致子组件无法渲染。
  -->
  <aboutProps :title="'这是字符串'" />
  <aboutProps :title="42" />
  <!-- 
  会触发警告且不会渲染
  <aboutProps :title="这是aboutProps组件的标题" /> 
  -->

  <aboutPropsTypeScript :title="'这是标题'" />

</template>

<style scoped>
.red{
  color: #fff;
  background-color: red;
}
.blue{
  color: #fff;
  background-color: blue;
}
</style>
