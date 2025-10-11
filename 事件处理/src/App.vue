<script setup>
import { computed, ref } from 'vue'
const title =ref("这是事件处理标题")
const text =ref("这是事件处理文本")
const count =ref(0)
const colorNum = ref(0);
const awaitLog = ms => {
  return new Promise(() => setTimeout(console.log(`延迟${ms / 1000}秒`), ms));
}
const awaitFun = async ms => {
  await awaitLog(ms);
  console.log("执行完毕")
}
const color = computed(() => {
  const r = colorNum.value % 256 + 60;
  const g = colorNum.value % 256 + 60;
  const b = colorNum.value % 256 + 60;
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
})
const arr = ref([1,2,3,4,5])
const reverseArr = () => arr.value.reverse();
const hello= (event) => {
  alert("Hello Vue3!")
  if(event){
    alert(event)
  }
}
const say = message => alert(message)

const doThis = () => {
  console.log("doThis")
}

const log = (message) => console.log(message)

</script>

<template>
  <!-- 
    Vue 可以使用 v-on 指令 (简写为 @) 来监听 DOM 事件
    并在事件触发时执行对应的 JavaScript
    事件处理器分为两种类型：
    内联事件处理器 和 方法事件处理器 
  -->

  <!-- 内联事件处理器 -->
  <!-- 简单来说就是将js代码直接写在事件处理器中 -->
  <!-- 因此内联事件处理器通常用于简单场景 -->
  <p>count: {{ count }}</p>
  <button @click="count++">点击 +1</button>

  <!-- 方法事件处理器 -->
  <!-- 方法事件处理器是将事件处理逻辑封装到一个函数中 -->
  <!-- 简单来说就是调用js函数 -->
  <!-- 因此方法事件处理器通常用于复杂场景 -->
  <p>数组: {{arr}}</p>
  <button @click="reverseArr">反转数组</button>
  <button @click="hello">点击弹出Hello Vue3</button>

  <hr/>
  <!-- 在内联处理器中调用方法 -->
  <!-- 
    与上面的方法事件处理器效果一样
    但用内联处理器调用函数时可以灵活的传参
  -->
  <button @click="say('Hello!!!')">Say Hello</button>
  <button @click="say('Ah!!!')">Say Ah</button>

  <!-- 在内联处理器中访问事件参数 -->
  <!-- 可以使用 $event 访问原生 DOM 事件对象 -->
  <button @click="say($event.target)">Say event</button>
  <!-- 也可以使用内联箭头函数 -->
  <button @click="e => say(e.target)">Say event</button>
  <!-- 未解决，不知道为什么无法直接使用alert -->
  <!-- <button @click="event => alert('event is' + event)">Say event</button> -->

  <hr/>
  <!-- 事件修饰符 -->
  <!-- prevent 修饰符可以阻止事件的默认行为 -->
  <!-- 例如，点击链接时阻止跳转 -->
   <a href="https://space.bilibili.com/117207640?spm_id_from=333.1007.0.0"
      @click.prevent="say('doThis')">bilibili</a>

  <!-- stop 修饰符可以阻止事件冒泡 -->
  <!-- 不加 stop 修饰符时，点击 button 会触发 div 和 button 的点击事件 -->
  <div @click="say('点击了div')">
    <button @click="say('点击了button')">无stop修饰</button>
  </div>
  <!-- 加上 stop 修饰符时，点击 button 只会触发 button 的点击事件 -->
  <div @click="say('点击了div')">
    <button @click.stop="say('点击了button')">有stop修饰</button>
  </div>

  <!-- 可以同时使用多个修饰符 -->
  <!-- 下面的例子中，点击链接时既不会跳转，也不会触发 div 的点击事件 -->
  <div @click="say('点击了div')">
    <a href="https://space.bilibili.com/117207640?spm_id_from=333.1007.0.0"
      @click.prevent.stop="say('点击了a')">bilibili</a>
  </div> 

  <!-- self 修饰符可以阻止子元素事件冒泡触发父元素 -->
  <!-- 但子类的元素事件依旧会冒泡 -->
  <!-- 类似经过父类元素但不触发 -->
  <div @click.self="say('点击了div')">点击div
    <button @click="say('点击了button')">有self修饰</button>
  </div>

  <!-- 这里点击后会在捕获阶段就将capture修饰的事件监听器触发 -->
  <!-- DOM 事件流以三个阶段（捕获 → 目标 → 冒泡）进行传播 -->
  <!-- 因此会先触发指向div的事件监听器 -->
  <div @click.capture="say('点击了div')">
    <button @click="say('点击了button')">有capture修饰</button>
  </div>

  <!-- once修饰符使点击事件最多被触发一次 -->
  <!-- 但click事件依旧回向上冒泡 -->
  <div @click="say('点击了div')">
    <button @click.once="count++">count: {{ count }}</button>
  </div>
  <!-- 可以注意到在网页中是先出现警告然后再出现count+1 -->
  <!-- 这实际上是因为vue中ref异步渲染导致的 -->
  <!-- 实际上是先执行了子类的事件监听器然后再执行父类的事件监听器 -->
  <!-- 即顺序为count++ -> say('点击了div') -->
  <!-- 下面的例子可以比较直观的体现 -->
  <div @click="console.log('div')">
    <button @click.once="console.log('button')">执行顺序</button>
  </div>

  <!-- 有关scroll的应用 -->
  <div class="div-p" 
    @scroll="colorNum += 2" 
     :style="{backgroundColor: color}" >
    <p v-for="n in 20">
      {{ n }}
    </p>
  </div>
  <p>scrollNum: {{ colorNum }}</p>

  <!-- 关于@scroll.passive的应用 -->
  <!-- 
    很可惜现在阶段我找不到什么比较好的例子
    这里就简单说明一下
    1. 使用@scroll监听滚动事件时，
       浏览器会等待事件处理器执行完毕后再进行滚动

    2. 使用@scroll.passive监听滚动事件时，
       浏览器会立即进行滚动，
       而不会等待事件处理器执行完毕

    3. 因此@scroll.passive可以提高滚动性能，避免滚动卡顿 
  -->
  <div class="div-p" @scroll.passive="doThis">
    <p v-for="n in 10">
      {{ n }}
    </p>
  </div>
  <!-- .passive 修饰符一般用于触摸事件的监听器
  可以用来改善移动端设备的滚屏性能。 -->

  <hr/>

  <!-- 按键修饰符 -->
  <input @keyup.enter ="log('芜湖')" />

</template>

<style scoped>
p{
  margin: 0;
}
button{
  font-size: 1rem;
}
.div-p{
  overflow: auto;
  height: 15vh;
  width: 30vw;
}
</style>
