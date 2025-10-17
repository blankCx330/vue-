<script setup>
import {reactive, ref, watch, watchEffect, onWatcherCleanup} from 'vue'
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
// 仅当 deepObjReactive 被替换时触发
watch(
  () => deepObjReactive,
  (newObj, oldObj)=>{
  console.log("getter函数返回对象"+newObj.count.a, oldObj.count.a)
})

//显式的加上deep强制转换成深层侦听器
watch(
  () => deepObjReactive,
  (newObj, oldObj)=>{
  console.log("deep + getter函数返回对象"+newObj.count.a, oldObj.count.a)
},
{deep: true})

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

// 注意：
// 深度侦听需要遍历被侦听对象中的所有嵌套的属性，
// 当用于大型数据结构时，开销很大。
// 因此请只在必要时才使用它，并且要留意性能。



// 即时回调的侦听器
// watch 默认是懒执行的：仅当数据源变化时，才会执行回调。
// 显式声明immediate
// 可以在数据源变化前先触发一次回调函数
const source = ref(0);
watch(
    source,
    (newValue, oldValue) => {
      console.log('newSource:' + newValue, 'oldSource:'+ oldValue)
    },
    {immediate: true}
)



// 一次性侦听器
// 显式声明once
// 和其名字一样，只会触发一次回调函数
const one = ref(100)
watch(
    one,
    (newValue, oldValue) => {
      console.log('一次性侦听器' + newValue, oldValue)
    },
    {once: true}
  )
const updateOne = () => one.value++;



//watchEffect()
//在官方文档中说的
//侦听器的回调使用与源完全相同的响应式状态是很常见的。
//简单来说这句话的意思是
//在侦听器的回调函数中使用监听的数据是很常见的

//举个例子
const count = ref(2) //商品数量

//这里就使用了监听的数据
watch(count,(newValue)=>{
  const totalPrice = newValue * 100 //总价
  console.log(`一共${totalPrice}元`)
})

//watchEffect()可以简化上面的代码
//watchEffect允许我们自动跟踪回调的响应式依赖
//并且watchEffect的回调会立即执行(不需要显示的指定immediate: true)
//也就是说这个回调函数会先执行一次
watchEffect(()=>{
    const totalPrice = count.value * 100 //总价
    console.log(`使用watchEffect：一共${totalPrice}元`)
})
//来自官方文档：
// 对于这种只有一个依赖项的例子来说，watchEffect() 的好处相对较小。
// 但是对于有多个依赖项的侦听器来说，使用 watchEffect() 可以消除手动维护依赖列表的负担。
// 此外，如果你需要侦听一个嵌套数据结构中的几个属性，watchEffect() 可能会比深度侦听器更有效，
// 因为它将只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性。



//副作用清理
const inputText = ref('')
const awaitText = ref('')

const awaitFn = async () => {
  console.log(inputText.value)
  setTimeout( () => {
    awaitText.value = inputText.value
  }, '1000')
}

watch(inputText, async (newValue)=>{
  const controller = new AbortController()
    onWatcherCleanup(()=>{
    controller.abort()
  })
  try{
      await awaitFn(newValue)
  }
  catch(err){
    if(err.name === 'AbortError'){
      console.log('旧请求被终止')
    }
  }

})

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
<button @click="updateOne">一次性侦听器</button>
<button @click="count++">商品数量+1</button>

<hr/>
<h2>{{ awaitText }}</h2>
<input type="text" v-model="inputText"/>

</template>

<style scoped>
button{
  font-size: 1.3rem;
}
</style>
