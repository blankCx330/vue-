<script setup>
import {ref} from 'vue'
const text = ref('这是defineExpose的文本')
const num = ref(42)

defineExpose({
    text,
    num
})
</script>

<template>
<h1>{{ text }}</h1>
</template>

<style scoped></style>e