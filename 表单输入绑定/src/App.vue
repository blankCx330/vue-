<script setup>
import { ref } from 'vue'
const text = ref("这是文本")
const message = ref('')
const argee = ref(true);
const argeeArr = ref([true, false, true, true])
const chaekedName = ref([])
const arr = ref([])
const selected = ref('');
const selectArr = ref([]);
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
  <!-- 
    注意：
    textarea中并不支持插值表达式
    这里没有报错的原因是
    插值表达式是单向的
    一旦修改了taxtarea里的内容那么插值表达式就会断开联系
    message不在指向这里，使用之后修改message的值
    也不会影响到textarea里的内容 
  -->
  <textarea>{{ message }}</textarea>

  <!-- 这里直接无视了text
  v-model的优先级高于插值表达式 -->
  <textarea v-model="message">{{ text }}</textarea>
  <hr/>
  <!-- 复选框 checkbox -->
  <!-- 复选框的v-model绑定布尔值 -->
  <input id="checkbox" type="checkbox" v-model="argee" />
  <label for="checkbox">{{ argee }}</label>
  <!-- 
    实际上不绑定布尔值并不会报错
    并且没有选中(理论上来说是会将非空字符串转换为true的，但不知道为什么这里没有选中)
    但在点击复选框时
    复选框的选中与否会决定绑定值是true还是false
  -->
  <input id="checkbox" type="checkbox" v-model="text" />
  {{ text }}
  <br/>
  <!-- 复选框绑定到同一个数组或集合的值 -->
  <!-- 
    值得一提的是当复选框的v-model绑定到数组时
    会执行另一套逻辑 
    选中 → value入数组，取消 → 出数组

    而绑定布尔值的逻辑是
    选中 → true，取消 → false
  -->
  <!-- 
    选中后会将复选框的value押入数组
    取消选中后会将复选框的value推出数组
    强调这点的意思是
    数组的元素顺序是按照用户勾选的顺序来的 
  -->
  <p>选中的名字：{{ chaekedName.join(" ") }}</p>
  <input type="checkbox" id="阿基维利" value="阿基维利的value" v-model="chaekedName" />
  <label for="阿基维利">阿基维利</label>
  <input type="checkbox" id="啊哈" value="啊哈的value" v-model="chaekedName" />
  <label for="啊哈">啊哈</label>
  <input type="checkbox" id="星穹列车" value="星穹列车的value" v-model="chaekedName" />
  <label for="星穹列车">星穹列车</label>

  <!-- 单选按钮 -->
  <!-- 
    Vue 通过 v-model的双向绑定机制自动实现了单选按钮的互斥逻辑。
    v-model会为每个按钮单选动态管理checked
    当v-model绑定同一个数据属性时vue会比较value与当前绑定的数据值
    自动更新checked状态
    Vue 中，使用 v-model绑定单选按钮时，​不需要显式设置 name属性 
    但还是推荐设置name属性
    即使 Vue 不依赖 name，原生表单提交和部分工具链仍需要它。
  -->
  <p>arr:{{ arr }}</p>
  <input type="radio" id="one" value="one" v-model="arr" />
  <label for="one">one</label>
  <input type="radio" id="two" value="two" v-model="arr" />
  <label for="two">two</label>

  <!-- 选择器 -->
  <!-- 
    select中v-model会自动追踪option的value值
    当option没有设置value属性时
    vue会自动将option的文本内容作为value值 
  -->
  <div>Select: {{ selected }}</div>
  <select v-model="selected">
    <option disabled>请选择</option>
    <option>A</option>
    <option>B</option>
    <option value="这是C">C</option>
  </select>

  <div>SelectArr: {{ selectArr.join(' ') }}</div>
  <select v-model="selectArr" multiple>
    <option value="1">AB</option>
    <option value="2">CD</option>
    <option value="3">AAA</option>
  </select>

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
  width: 200px;
  word-wrap: break-word;
}
</style>