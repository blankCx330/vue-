<script setup>
import { ref } from 'vue';
defineProps(['title', 'id']);
</script>

<template>
    <div>
        <h2>这是第{{ id }}个标题：{{ title }}</h2>
        <p>这是段落文本哈哈</p>
    </div>
</template>

<style scoped>
h2, p{
    margin: 0;
    padding: 0;
}

</style>
