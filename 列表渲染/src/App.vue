<script setup>
import { ref } from 'vue';
const items = ref(['Item 1', 'Item 2', 'Item 3']);
const arrObj = ref([{num: 1}, {num: 2}, {num: 3}]);
const charObj= ref([
    {text: '这是第一个文本'}, 
    {text: '这是第二个文本'},
    {text: '这是第三个文本'},
    ])
const updateArrObj = () => {
    arrObj.value.push({num: (arrObj.value.length + 1)})
}

</script>

<template>
    <!-- 
     简单来说v-for可以理解为创建多个v-for所在的元素
     其数量根据数组的长度决定
     例如下面的例子在实际渲染中是：
     <li>Item 1</li>
     <li>Item 2</li>
     <li>Item 3</li>

     <div class="div-p">
        <p>1</p>
        <p>2</p>
        <p>3</p>
     </div>
    -->
<li v-for="itme in  items" >
    {{ itme }}
</li>
<div class="div-p">
    <p v-for="arr in arrObj">
    {{ arr.num }}
    </p>
</div>

<!-- 点击按钮也会重新渲染v-for元素 -->
<button @click="updateArrObj">+1</button>

<!-- bug：下面的代码会将“————”渲染出错，会断掉一部分 -->
<!-- v-for 也支持使用可选的第二个参数表示当前项的位置索引。 -->
<h3 v-for="(char, index) in charObj">
    index: {{ index }} ———— 对应的文本：{{ char.text }}
</h3>

<!-- 
    也可以使用 of 作为分隔符来替代 in
    这更接近 JavaScript 的迭代器语法： 
-->
<p v-for="arr of arrObj">
    {{ arr.num }}
    </p>


</template>

<style scoped>
.div-p{
    display: flex;
}
p{
    font-size: 1.3rem;
    margin: 5px;
}
button{
    font-size: 1.5rem;
}
</style>
