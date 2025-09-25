<script setup>
import { ref } from 'vue'

const htmlText = `<h1>文本标题</h1>`

const text = ref('这是一个文本')
const idText1 = ref('isId1')
const idText2 = ref('isId2')
const obj = {
  id: 'objId',
  class: 'objClass',
  style: 'font-size: 1.5rem'
}

const ok = ref(true)
const num = ref(10);

const sum = (a, b) => a + b;
const classFun = () => {
  return "isClassFun"
}
const updateOk = () => {
  ok.value = !ok.value //rel对ok进行了封装沙盒，需要通过value提取修改内容
}
const updateFun = () => {
  return ok.value ? 'id' : 'click';
}

</script>

<template>
  <!-- 使用v-html的元素中必须为空 -->
  <div v-html="htmlText"></div>

  <!-- 这里使用两种方式来进行元素的属性命名 -->
  <div v-bind:id="idText1">{{ text }}</div>
  <div :id="idText2">{{ text }}</div>

  <!-- 将对象解析为对应的属性 -->
  <div v-bind="obj">{{ text }}</div>
  <!-- 错误写法 -->
  <div :id="obj" :class="obj" :style="obj">{{ text }}</div>

  <!-- 使用JavaScript表达式 -->
  <div>num: {{ Math.floor(num + 1.5) }}</div>
  <p v-if="!ok">现在点击num++按钮可以改变num的值</p>
  <div>{{ ok ? 'yes' : 'no' }}</div>
  <div>{{ `红色字文本的id是${idText1}` }}</div>
  <div :id="`copy${idText1}`">在属性中也适用</div>
  <!-- 
    error只能使用表达式 
   <div>{{ const a = 1 }}</div>这是一个语句并非表达式
   <div>{{ if(ok){ return: 'yes'} }}</div> 这个也不行但可以使用三元表达式
  -->

  <!-- 调用函数 -->
  <div>{{ sum(21,21) }}</div>
  <div :class="classFun()">属性名也可以调用函数</div>

  <!-- 更多的vue指令 -->
   <div v-if="ok">ok为true时候打印</div><!-- v-if 指令会基于表达式ok的值的真假来移除/插入该元素 -->
   <button @click="updateOk()">切换ok的值</button><!-- 这里的@实际上是v-on的缩写 -->
   
   <!-- 动态参数 -->
   <!-- 
    简单来说就是会将[updateFun()]中计算出来的结果解析为属性
    例如这里
    div中等价于:id="idText1" 或 :click="idText1"
    button中等价于@id="num++" 或 @click="num++"
   -->
    <div :[updateFun()]="idText1">{{ text }}</div>
    <button @[updateFun()]="num++">num++</button>
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

  .isClassFun{
    font-size: 2rem;
    color: green;
  }
</style>
