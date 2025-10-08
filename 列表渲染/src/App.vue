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

const titles = ref(['第一个title', '第二个title', '第三个title']);
const pars = ref(['第一个par', '第二个par', '第三个par']);
const add = (a,b) => a + b
const myObj = ref({
    name: '开拓者',
    path: '开拓',
    partner: '三月七，丹恒',
    add: add(19, 18),
})

const keyObj= ref([
    {id: 1, name: '张三'},
    {id: 2, name: '李四'},
    {id: 3, name: '王五'},
])
const addKeyObj = () => {
    keyObj.value.unshift({
        id: keyObj.value.length + 1,
        name: '新成员'
    })
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

<!-- 嵌套使用v-for -->
<!--   
    Vue 的渲染是深度优先的
    渲染顺序是先完成外层 h1标签的渲染
    然后再为每个 h1标签填充内层的 p标签。
-->
<div class="div-p">
    <h1 v-for="tittle in titles">
        {{ tittle }}
        <p v-for="par in pars">
            {{ par }}
        </p>
    </h1>
</div>

<!-- 使用v-for来遍历一个对象的所有属性 -->
<!-- 也是渲染了三个元素 -->
<div v-for="value in myObj" style="border: 1px solid black;">
    {{ value }}
</div>

<!-- 
    对于对象
    第二个参数表示它的键值
    第三个参数表示位置索引 
-->
<div v-for = "(value, key, index) in myObj" style="border: 1px solid black;">
   {{ key }} : {{ value }} index: {{ index }}
</div>

<!-- v-for可以接受一个整数数值 -->
<!-- 注意，初始值是从1开始 -->
<div class="div-p">
    <p v-for="n in 18">
        {{ n }}
    </p>
    <p v-for="n in myObj.add"> <!-- 函数也可以 -->
        {{ n }}
    </p>
</div>

<ul>
  <template v-for="item in items">
    <li>{{ item }}</li>
    <li class="divider" role="presentation">芜湖</li>
  </template>
</ul>

<!-- 错误示例
     在条件渲染中提到，v-if的优先级高于v-for
     编译器会首先处理 v-if="obj.num === 2"这个表达式
     此时 v-for循环还没有执行，变量 obj根本不存在
     因此v-if试图访问一个未定义对象 (obj) 的属性 (num) 
     自然会引发错误
    <p v-for="obj in arrObj" v-if="obj.num === 2">
        {{ obj.num }}
    </p> 
-->

<!-- 正确示例 -->
<!-- 
     通过在 v-for循环内使用 v-if条件来过滤数组元素
     这也更加明显易读 
-->
<div v-for="obj in arrObj" >
    <p v-if="obj.num % 2 === 1">
        {{ obj.num }}
    </p>
</div>

<div v-for="kObj in keyObj">
    id:{{ kObj.id }} {{ kObj.name }}
</div>
<button @click="addKeyObj">添加新成员</button>

</template>

<style scoped>
.div-p{
    display: flex;
    width: 100vw;
    flex-wrap: wrap;
}
p{
    font-size: 1.3rem;
    margin: 5px;
}
button{
    font-size: 1.5rem;
}
</style>
