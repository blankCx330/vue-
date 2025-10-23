<script setup>
import {ref, useTemplateRef, onMounted, watch, watchEffect} from 'vue'
const text = ref('这是模板引用文本')
// 第一个参数必须与模板中的 ref 值匹配
const input = useTemplateRef('my-input')

// 这里会打印null
console.log(input.value)
// 原因：
// 只有在组件挂载后才能访问模板引用
// 此时DOM渲染并未完成，组件还未挂载

//这里会打印<input data-v-7a7a37b1="">
// setTimeout(()=>{console.log(input.value)}, 10)

// 有关onMounted
// 在组件挂载完成后（即 DOM 元素已渲染到页面）
// 安全访问或操作 DOM 元素。
onMounted(()=>{
  input.value.focus()
  //这里会打印<input data-v-7a7a37b1="">
  console.log(input.value)
})

watchEffect(()=>{
  if(input.value){
    console.log('挂载完成')
  } else{
    console.log('还未挂载')
  }
})

// 关于组件
// 模板引用也可以被用在一个子组件上
// 这种情况下引用中获得的值是组件实例
import Hello from './Hello.vue'
import OptionsAPI from './OptionsAPI.vue'
const helloRef = useTemplateRef('hello')

onMounted(()=>{
  console.log(helloRef.value)
})

// 如果一个子组件使用的是选项式 API 或没有使用 <script setup>
// 被引用的组件实例和该子组件的 this 完全一致
// 这意味着父组件对子组件的每一个属性和方法都有完全的访问权
// 简单来说就是使用选项式API子组件（默认暴露所有属性和方法） 
// <script setup>的是默认私有的



</script>

<template>
<!-- vue中可以使用ref来直接访问底层DOM元素 -->
<!-- 它允许我们在一个特定的 DOM 元素或子组件实例被挂载后，获得对它的直接引用。 -->
  <h1>{{ text }}</h1>
  <input ref="my-input" />

  <Hello ref="hello" />
  <options-a-p-i ref="optionsAPI" />

</template>

<style scoped>
input{
  font-size: 1.2rem;
}
</style>
