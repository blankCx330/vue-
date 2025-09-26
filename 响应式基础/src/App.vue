<script setup>//在单文件组件 (SFC)中<script setup>可以自动暴露函数和变量
import { ref } from 'vue' //要记得引入ref
const count = ref(0)//ref接受一个参数，然后返回一个ref对象
const text = ref('学习响应式基础文本');
const update = () => {
  // count.value += count; error
  // rel()将对象包裹在一个有value属性的对象中
  // 因此要使用和修改ref包裹的值需要使用.value
  count.value += 1;
  count.value %= 5;
}
const num = ref(0);
const obj1 = ref({
  numObj: 42,
  arr: [1, 2, 3]
})

</script>
<template>
  <div>{{ text }}</div>
  <button @click="update">{{ `count: ${count}` }}</button>
  <!-- 在模板中使用rel变量时不能使用.value
  在模板中会自动解包rel对象
  不能正常使用↓
  <button @click="num.value++">num: {{ num }}</button> -->
  <button @click="num++">num: {{ num }}</button>
</template>

<style scoped>
button{
  display: block;
}
</style>
