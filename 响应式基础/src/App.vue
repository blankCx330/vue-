<script setup>//在单文件组件 (SFC)中<script setup>可以自动暴露函数和变量
import { ref, shallowRef, nextTick, reactive } from 'vue' //要记得引入ref
const count = ref(0)//ref接受一个参数，然后返回一个ref对象
const text = ref('学习响应式基础文本');
const update = () => {
  // count.value += count; error
  // rel()将对象包裹在一个有value属性的对象中
  // 因此要使用和修改ref包裹的值需要使用.value
  count.value += 1;
  count.value %= 5;
}
const num = ref(0);
const obj1 = ref({
  numObj: 42,
  arr: [1, 2, 3]
})
const updateObj1 = () =>{
  obj1.value.numObj += 42;
  obj1.value.arr.push(`ah!push${obj1.value.arr.length + 1}`);//push不会触发视图更新
}



// shallowRef创建一个浅响应式对象
// 简单来说shallowRef只会追踪第一层的变化(shallowObj.value)
// 而直接修改第二层的属性(例如numObj和arr)不会触发视图更新
// 例如下面的shallowObj对象
const shallowObj = shallowRef({
  numObj: 42,
  arr: [1, 2, 3]
})
// 修改第二层，不会更新视图
const updateShallowObjNumObj = () => shallowObj.value.numObj++;
const updateShallowObjArr = () => shallowObj.value.arr.push(shallowObj.value.arr.length + 1);
// 修改第一层，会更新视图
const updateShallowObj = () => {
  shallowObj.value = {
    numObj: shallowObj.value.numObj,
    arr: [...shallowObj.value.arr]
  }
}



//DOM更新时机
const domText = ref('初始文本');
const divText = ref(null);//获取DOM元素的引用
async function changeDomText() {
  domText.value = '修改后的文本';
  console.log('changeDomText:', divText.value?.textContent);//可能还是初始文本
  // 使用nextTick在下次DOM更新循环结束之后执行延迟回调
  await nextTick();
  console.log('nextTick:', divText.value?.textContent);//修改后的文本
}



//reactive()将深层地转换对象
//在ref()的值是一个对象时，ref()也会在内部调用它
//与浅层 ref 类似，这里也有一个 shallowReactive() API 可以选择退出深层响应性。
const raw = {};
const obj = reactive(raw);
//返回一个Proxy代理对象这个对象与raw不是全等的
console.log(obj === raw);//false

//对同一个原始对象调用 reactive() 会总是返回同样的代理对象
//reactive对同一个对象多次调用会返回同一个响应式对象
console.log(reactive(raw) === obj);//true

//reactive对一个已经是响应式的对象调用会返回这个对象本身
console.log(reactive(obj) === obj);//true

//依靠深层响应性，响应式对象内的嵌套对象依然是代理：
obj.b = raw;
console.log(obj.b === raw);//false

//修改obj会影响raw
obj.a = 1;
console.log(raw.a);

//reactive()不能替换整个对象
//简单来说就是当代理对象state执行state = reactive({ num: 1});时
//state会等于一个新的{num: 1}的代理对象,失去了对{num: 0}的引用
//state并未监视到{num: 0},{num: 1}的变化
//因此视图不会更新
let state = reactive({ stateNum: 0});
const updateState = () => {
  state = reactive({ stateNum: 1});//不会报错
  console.log("state.stateNum:"+state.stateNum);//1
}

//reactive()对解构操作不友好
//stateNum收到的是一个普通的数字
// 并且无法追踪 state.count 的变化
// 我们必须传入整个对象以保持响应性
let { stateNum } = state;
const updateStateNum = () => {
  stateNum++;
  console.log("stateNum:" + stateNum);
}
//鉴于以上reactive()的限制,vue官方推荐使用ref()作为声明响应式状态的主要 API。

let tempObj = ref({ temp: 0});
const updateTempObj = () => {
  tempObj = ref({ temp: 1});
  console.log(" tempObj:" + tempObj.value.temp);//记住rel要使用value来访问
};

//temp仍然不会追踪
let {temp} = tempObj.value;
console.log(temp);
tempObj.value.temp = 5;
console.log(temp);

</script>
<template>
  <div>{{ text }}</div>
  <button @click="update">{{ `count: ${count}` }}</button>
  <!-- 在模板中使用rel变量时不能使用.value
  在模板中会自动解包rel对象
  不能正常使用↓
  <button @click="num.value++">num: {{ num }}</button> -->
  <button @click="num++">num: {{ num }}</button>
  <div>{{ obj1 }}</div>
  <button @click="updateObj1">更新obj1</button>
  <div>shallowObj:{{ shallowObj }}</div>
  <!-- 不会触发视图更新 -->
  <button @click="updateShallowObjNumObj">numObj++</button>
  <button @click="updateShallowObjArr">arr.push()</button>
  <!-- 会触发视图更新 -->
  <button @click="updateShallowObj">查看shallowObj</button>

  <!-- DOM更新时机 -->
  <div ref="divText" >{{ domText }}</div>
  <button @click="changeDomText">修改domText</button>

  <!-- 视图不会更新 -->
  <div>state: {{ state }}</div>
  <button @click="updateState">更新state</button>
  <button @click="updateStateNum">StateNum++</button>

  <div>tempObj: {{ tempObj }} temp: {{ temp }}</div>
  <button @click="updateTempObj">更新tempObj</button>
</template>

<style scoped>
button{
  display: block;
}
</style>
