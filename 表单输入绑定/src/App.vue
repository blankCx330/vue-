<script setup>
import { ref } from 'vue'
const text = ref("")
const message = ref('')
const argee = ref(true);
const argeeArr = ref([true, false, true, true])
</script>

<template>
  <!-- 基本用法 -->
  <div>{{ text }}</div>
  <input v-model="text" placeholder="输入更改文本" />
  <br/>
  <span>你输入文章:</span>
  <div>{{ message }}</div>
  <textarea v-model="message" placeholder="输入文章帕" rows="5" cols="10" ></textarea>
  <br/>
  注意：
  textarea中并不支持插值表达式
  这里没有报错的原因是
  插值表达式是单向的
  一旦修改了taxtarea里的内容那么插值表达式就会断开联系
  Vue会将v-model的值覆盖插值表达式的值
  <textarea>{{ message }}</textarea>

</template>

<style scoped>
input{
  height: 1.3rem;
  font-size: 1.2rem;
}
textarea{
  font-size: 1.3rem
}
div{
  border: 1px solid #000;
  width: 100px;
  word-wrap: break-word;
}
</style>
