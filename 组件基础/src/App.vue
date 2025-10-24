<script setup>
import {ref} from 'vue'
const text = ref('这是组件基础文本')
</script>

<template>
  <h1>{{ text }}</h1>
</template>

<style scoped></style>
