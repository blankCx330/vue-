<script setup>
import { ref } from 'vue';
const text = ref('这是文本');
const isActive = ref(true);
const updateActive = () => {
  isActive.value = !isActive.value;
};
</script>

<template>
  <!-- active 是否存在取决于数据属性 isActive 的真假值 -->
  <div :class="{ active: isActive }">hello</div>
  <button @click="updateActive">Toggle Active</button>

  <!-- class可以与:class共存
   这里最后渲染的结果会是
   <div class="font-bold active">{{ text }}</div> -->
   
  <div 
    class="font-bold"
    :class="{ active: isActive }"
    >{{ text }}</div>
</template>

<style scoped>
.active {
  color: red;
}
.font-bold {
  font-weight: bold;
}
</style>
