<script setup>//在单文件组件 (SFC)中<script setup>可以自动暴露函数和变量
import { ref, shallowRef, nextTick } from 'vue' //要记得引入ref
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

  <div ref="divText" >{{ domText }}</div>
  <button @click="changeDomText">修改domText</button>
</template>

<style scoped>
button{
  display: block;
}
</style>
