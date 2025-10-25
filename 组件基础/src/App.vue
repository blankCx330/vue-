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
</script>

<template>
  <h1>{{ text }}</h1>
  <click-button />
  <br />
  <js-click-button ref="jsButtonRef" />
</template>

<style scoped></style>
