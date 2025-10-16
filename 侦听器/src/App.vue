<script setup>
import {reactive, ref, watch} from 'vue'
const text = ref('这是侦听器文本')

// watch的用法 
// 官方文档的有点复杂这里就简单的体现了其用法
// 简单来说watch可以检测一个数据的变化
// 并在第二个回调函数中输入新值和旧值
// 在状态变化时执行一些“副作用”
watch(text, (newText, oldText)=>{
  console.log('newText:' + newText,'oldText:' + oldText);
})

// watch 的第一个参数可以是不同形式的“数据源”：
// 它可以是一个 ref (包括计算属性)
// 一个响应式对象
// 一个 getter 函数
// 或多个数据源组成的数组：
const x = ref(0);
const obj = reactive({num: 0});
const fn = () => 'wdf'

//单个ref
watch(x, (newX)=>{
  console.log(newX);
})

//响应式对象
watch(obj, (newObj)=>{
  console.log(newObj);
})

//getter函数
watch(fn, (newFn)=>{
  console.log(newFn);
})
//也可以是这种形式的
watch(()=>'不是' + '哥们', (newText)=>{
  console.log(newText);
})
//多个数据源组成的数组：
watch([text, x, obj, fn, ()=>'不是' + '哥们'], (newText)=>{
  console.log(newText);
})

//这里会出现警告
//因为不能直接侦听响应式对象的属性值
//这里得到的obj.num实际上是一个类型为number的数字
//简单来说就是类型不匹配
//将上面的代码改成这样不会出现警告
//const obj = reactive({num: ()=>0 });

// watch(obj.num, (num)=>{
//   console.log(num);
// })

//但更多是这样解决
//直接使用回调来回调本身即可
watch(()=>obj.num, (num)=>{
  console.log(num);
})



//深层侦听器
const deepObj = ref({id: {age:18, sex:'man'}})
const deepObjReactive = reactive({count: {a: 1}})
const updateAge = () => deepObj.value.id.age++;
const updateA = () => deepObjReactive.count.a++;

// 这里可以监听到对象的深层变化
// 因为传入的是响应式对象(reactive)
// 会隐式地创建一个深层侦听器
// 该回调函数在所有嵌套的变更时都会被触发
watch(deepObjReactive,(newObj, oldObj)=>{
  //注意这里的newObj, oldObj是相等的
  //因为这里只是改变对象内部的数据
  //对象本身的引用地址未改变
  //因此 newObj和 oldObj是同一个对象（严格相等 ===）
  console.log(newObj.count.a, oldObj.count.a)
  console.log(newObj === oldObj)
})

//一个返回响应式对象的 getter 函数
//返回不同的对象时，才会触发回调
watch(
  () => deepObjReactive,
  (newObj, oldObj)=>{
  console.log("getter函数返回对象"+newObj.count.a, oldObj.count.a)
})
const updateObj = () => deepObjReactive = {num: 10};

//这里并不能监听到对象的深层变化
//因为传入的是ref，即使其内部是嵌套对象，默认的watch仍然是浅层监听
watch(deepObj,(newDeepObj, oldDeepObj)=>{
  console.log('new:' + newDeepObj,'old:' + oldDeepObj)
})
//可以显示的加上deep选项转成深层侦听器
watch(deepObj,(newDeepObj, oldDeepObj)=>{
  console.log('使用了deep new:' + newDeepObj,'old:' + oldDeepObj)
},
{deep: true});

</script>

<template>
<h1>{{ text }}</h1>
<form>
  <input type="text" v-model.lazy="text" />
</form>
<hr/>
<div>age: {{ deepObj.id.age }}</div>
<button @click="updateAge">age++</button>
<button @click="updateA">a++</button>
<button @click="updateObj">updateObj</button>

</template>

<style scoped>
button{
  font-size: 1.3rem;
}
</style>
