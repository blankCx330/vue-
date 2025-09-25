<script setup>
import { ref } from 'vue'
const text = ref('这是一个文本')
const idText1 = ref('isId1')
const idText2 = ref('isId2')
const obj = {
  id: 'objId',
  class: 'objClass',
  style: 'font-size: 1.5rem'
}


const num = 10;
const ok = true;
</script>

<template>
  <!-- 这里使用两种方式来进行元素的属性命名 -->
  <div v-bind:id="idText1">{{ text }}</div>
  <div :id="idText2">{{ text }}</div>

  <!-- 将对象解析为对应的属性 -->
  <div v-bind="obj">{{ text }}</div>
  <!-- 错误写法 -->
  <div :id="obj" :class="obj" :style="obj">{{ text }}</div>

  <!-- 使用JavaScript表达式 -->
  <div>{{ num + 1 }}</div>
  <div>{{ ok ? 'yes' : 'no' }}</div>
  <div>{{ `红色字文本的id是${idText1}` }}</div>
  <div :id="`copy${idText1}`">在属性中也适用</div>
  <!-- error只能使用 -->
</template>

<style scoped>
  #isId1{
    color: red;
  }
  #isId2{
    color: blue;
  }

  #objId{
    color: aqua;
  }
  .objClass{
    font-weight: bold;
  }

  #copyisId1{
    color: chocolate;
    font-weight: bold;
  }
</style>
