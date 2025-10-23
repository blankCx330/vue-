<script setup>
import {ref} from 'vue'
const text = ref('hello!')
const para = ref('这是组件文本')

</script>

<template>
<h1>{{ text }}</h1>
<p>{{ para }}</p>
</template>

<style scoped></style>