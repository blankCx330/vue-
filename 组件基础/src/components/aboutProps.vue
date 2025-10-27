<script setup>
// 有关返回props
const props = defineProps(['title'])
console.log(`aboutProps组件打印:${props.title}`)
</script>

<template>
    <h4>{{ title }}</h4>
</template>