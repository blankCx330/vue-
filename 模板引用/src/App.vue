<script setup>
import {ref, useTemplateRef, onMounted, watch, watchEffect} from 'vue'
const text = ref('这是模板引用文本')
// 第一个参数必须与模板中的 ref 值匹配
const input = useTemplateRef('my-input')

// 这里会打印null
console.log(input.value)
// 原因：
// 只有在组件挂载后才能访问模板引用
// 此时DOM渲染并未完成，组件还未挂载

//这里会打印<input data-v-7a7a37b1="">
// setTimeout(()=>{console.log(input.value)}, 10)

// 有关onMounted
// 在组件挂载完成后（即 DOM 元素已渲染到页面）
// 安全访问或操作 DOM 元素。
onMounted(()=>{
  input.value.focus()
  //这里会打印<input data-v-7a7a37b1="">
  console.log(input.value)
})

watchEffect(()=>{
  if(input.value){
    console.log('挂载完成')
  } else{
    console.log('还未挂载')
  }
})

// 关于组件
// 模板引用也可以被用在一个子组件上
// 这种情况下引用中获得的值是组件实例
import Hello from './Hello.vue'
import OptionsAPI from './OptionsAPI.vue'
import DefineExposeModel from './defineExposeModel.vue'
const helloRef = useTemplateRef('hello')
const optionsAPI = useTemplateRef('optionsAPI')
const defineExposeModel = useTemplateRef('defineExposeModel')

onMounted(()=>{
  console.log(helloRef.value)
})

// 如果一个子组件使用的是选项式 API 或没有使用 <script setup>
// 被引用的组件实例和该子组件的 this 完全一致
// 这意味着父组件对子组件的每一个属性和方法都有完全的访问权
// 简单来说就是使用选项式API子组件（默认暴露所有属性和方法） 
// <script setup>是默认私有的

onMounted(()=>{
  console.log(helloRef.value.text)//这个打印 undefined
  console.log(optionsAPI.value.text)//这个打印 这是选项式API子组件文本

  // 可以访问并修改子组件的变量
  optionsAPI.value.num = 100

  // 可以调用子组件的方法
  optionsAPI.value.UpdateNum()
  optionsAPI.value.updateText('修改文本')

  // 在使用<script setup>的组件中可以用defineExpose来宏显式暴露
  // 当父组件通过模板引用获取到了该组件的实例时
  // 得到的实例类型为 { a: number, b: number } 
  // (ref 都会自动解包，和一般的实例一样)。
  // 请注意，defineExpose 必须在任何 await 操作之前调用。
  // 否则，在 await 操作后暴露的属性和方法将无法访问
  // 因为defineExpose会等待await操作
  // 但此时父组件如果访问defineExpose暴露的变量就会出错
  console.log(defineExposeModel.value.text)
  console.log(defineExposeModel.value.num)
})


// v-for 中的模板引用
const list = ref([1,2,3])
const listRef = useTemplateRef('items')

onMounted(()=>{
  // 当在 v-for 中使用模板引用时
  // 对应的 ref 中包含的值是一个数组
  console.log(listRef.value)
  console.log(listRef.value[2]) //这里引用第三个元素
})


// 函数模板引用
// 除了使用字符串值作名字，
// ref attribute 还可以绑定为一个函数
// 会在每次组件更新时都被调用。
// 该函数会收到元素引用作为其第一个参数
// 函数式 ref的回调参数 el是原生 DOM 元素，直接操作即可

// 简单来说就是当元素发生改变时(挂载/卸载)会触发:ref 并且 会返回 该元素引用
// 元素消失时返回的元素引用为null
const date = ref('')
const logDate = (el) =>{
  date.value = el// 保存元素引用
  console.log(`这是函数模板应用打印: date.value: ${date.value} el: ${el}`)
  if(date.value){
    console.log(`date.value.textContent:${date.value.textContent}`)
  }
  if(el){
    console.log(`el.textContent:${el.textContent}`)
  }
}
const state = ref(true)
const updateState = () => state.value = !state.value


</script>

<template>
<!-- vue中可以使用ref来直接访问底层DOM元素 -->
<!-- 它允许我们在一个特定的 DOM 元素或子组件实例被挂载后，获得对它的直接引用。 -->
  <h1>{{ text }}</h1>
  <input ref="my-input" />

  <Hello ref="hello" />
  <OptionsAPI ref="optionsAPI" />
  <DefineExposeModel ref="defineExposeModel" />

  <ul>
    <li v-for="item in list" ref="items" :key="item">
      {{ item }}
    </li>
  </ul>


  <!-- 
    其中的:ref可以这样写：
    :ref="(el)=>{console.log(`函数模板引用：${el}`)}" 
    也可以这样:ref="logDate"
    但要注意函数会接受该元素引用作为其第一个参数
  -->
  <h2 
    :ref="logDate"
    v-if="state"
    >
    这是函数模板引用文本
  </h2>
  <button @click="updateState">更新</button>

</template>

<style scoped>
input{
  font-size: 1.2rem;
}
</style>
