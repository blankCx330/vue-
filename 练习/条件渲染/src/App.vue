<script setup>
import { ref } from 'vue'
const isTrue = ref(true);
const isFalse = ref(false);
const text = ref('这是条件渲染文本');
const trueOrFalse = ref(true);
const updateTrueOrFalse = () => trueOrFalse.value = !trueOrFalse.value;
const ABC = ['A', 'B', 'C'];
const typeNum = ref(0);
const type = ref(ABC[0]);
//注意,ref只会追踪变化后重新渲染,并不会更改变量
//因此type = ABC[typeNum.value];要放在函数中更新
const updateType = () => {
  typeNum.value = (typeNum.value + 1)%4;
  type.value = ABC[typeNum.value];
};

</script>
<template>
  <!-- v-if指令用于条件性的渲染一块内容 -->
  <!-- 当v-if中的条件true时，渲染该块内容，否则不渲染 -->
    <h1 v-if="isTrue">{{ text }}</h1>
    <h1 v-if="isFalse">这是false</h1>

    <!-- 
    v-else会自动绑定最近的v-if
    但v-if与v-else中间不能有其他元素 
    -->
    <h1 v-if="isFalse">这是false</h1>
    <h1 v-else>这是else</h1>
    
    <h1 v-if="trueOrFalse">True文本</h1>
    <h1 v-else>False文本</h1>
    <button @click="updateTrueOrFalse">切换true或false</button>

    <!--
    这里vue会直接报错 
    <h1 v-if="isFalse">这是false</h1>
    <span>这是中间的元素</span>
    <h1 v-else>这是else</h1> 
    -->

    <!-- 
    v-else-if  提供的是相应于 v-if 的“else if 区块”。
    它可以连续多次重复使用： 
    -->
    <h2 v-if="type === 'A'">type = A</h2>
    <h2 v-else-if="type === 'B'">type = B</h2>
    <h2 v-else-if="type === 'C'">type = C</h2>
    <h2 v-else>type != A B C</h2>
    <button @click="updateType">改变type</button>

    <!-- 
    同理v-else-if也必须紧跟v-if或v-else-if元素的后面
    以下的三种情况都会报错 
    -->
      <!-- 
        <h2 v-if="type === 'A'">type = A</h2>
        <span>这是中间的元素</span>
        <h2 v-else-if="type === 'B'">type = B</h2> 
      -->
      <!-- 
        <h2 v-if="type === 'A'">type = A</h2>
        <h2 v-else-if="type === 'B'">type = B</h2>
        <span>这是中间的元素</span>
        <h2 v-else-if="type === 'C'">type = C</h2> 
      -->
      <!-- 
        <h2 v-if="type === 'A'">type = A</h2>
        <h2 v-else-if="type === 'B'">type = B</h2>
        <h2 v-else-if="type === 'C'">type = C</h2>
        <span>这是中间的元素</span>
        <h2 v-else>type != A B C</h2> 
      -->

      <!-- v-if在一个容器上时会将其子元素也一同 渲染/不渲染 -->
      <div v-if="trueOrFalse">
        <h1>h1 {{ text }}</h1>
        <p>p {{ text }}</p>
        <p>p {{ text }}</p>
      </div>

      <!-- 
        v-show和v-if的用法基本一样
        不同的是v-show改变的是元素的CSS属性display
        当v-show的值为false时，元素会被设置为display:none
        而v-if则是直接将元素从DOM树中移除
        因此v-show更适合频繁切换显示/隐藏的场景
        而v-if更适合条件不经常变化的场景 
      -->
      <!-- 
        注意
        v-show不能在template上使用
        也不能搭配v-else或v-else-if使用 
      -->
      <h1 v-show="trueOrFalse">Hello!</h1>
      <template v-show="trueOrFalse">
        <h1>h1 {{ text }}</h1>
        <p>p {{ text }}</p>
        <p>p {{ text }}</p>
      </template>

      <!-- 关于v-if，值得一提的是
      v-if 是惰性的：
      如果在初次渲染时条件值为 false，则不会做任何事。
      条件区块只有当条件首次变为 true 时才被渲染。 -->

      <!-- 
      在有关下一章节的列表渲染中
      当 v-if 和 v-for 同时存在于一个元素上的时候，v-if 会首先被执行。
      警告
      同时使用 v-if 和 v-for 是不推荐的，因为这样二者的优先级不明显。
      -->

</template>

<style scoped>
div{
  border: 2px solid black;
  width: 500px;
}
button{
  font-size: 1.5rem;
}
</style>
