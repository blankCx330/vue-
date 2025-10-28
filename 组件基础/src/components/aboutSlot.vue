<script setup></script>

<template>
    <div class="box">
        <strong>这是aboutSlot自己的文本</strong>
        <br/>
        <slot />
    </div>
</template>

<style scoped>
.box{
    border: 2px solid #385dd6;
    width: 300px;
    height: 100px;
}
</style>