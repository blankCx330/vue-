<script setup>
// 当使用构建步骤时
// 我们一般会将 Vue 组件定义在一个单独的 .vue 文件中
// 这被叫做单文件组件 (简称 SFC)：
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
<button @click="count++">count:{{ count }}</button>

</template>

<style scoped>
button{
 font-size: 1.2rem
}
</style>