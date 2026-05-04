<script setup>
defineProps(['title', 'post', 'id'])
// 这里是声明组件可以主动触发的事件的名字
// 让父组件可以避免"魔法事件"（未声明的事件被误用）
defineEmits(['addFontSize'])
</script>

<template>
    <h5>{{ title }}</h5>
    <p>{{ post }}</p>
    <!-- 子组件通过$emit将事件信号发送给父组件 -->
    <button @click="$emit('addFontSize')">addFontSize{{ id }}</button>

</template>

<style scoped>
h5{
    margin: 0;
}
p{
    margin: 0;
}
</style>