<script setup>
import { ref, computed } from 'vue';
const text = ref('这是文本');
const styleText = ref('这是style文本');
const isActive = ref(true);
const  hasError = ref(false);
const updateActive = () => {
  isActive.value = !isActive.value;
};
const classObj = ref({
  classObj1: true,
  classObj2: false,
})
const classObjComputed = computed(() => ({
  classObj1: isActive.value && !hasError.value,
  classObj2: hasError.value || hasError.value === false,
}))



// 关于Style
const fontSize = ref(1.5);
const styleObj = ref({
  color: '#325',
  fontSize: '2rem'
})
const styleObj2 = ref({
  fontWeight: 'bold',
})


// 关于组件
import hello from './helloWorld.vue'
import towDiv from './towDiv.vue';
import errorTowDiv from './errorTowDiv.vue';
</script>

<template>
  <!-- active 是否存在取决于数据属性 isActive 的真假值 -->
  <!-- 由vue框架实现 -->
  <div :class="{ active: isActive }">hello</div>
  <button @click="updateActive">Toggle Active</button>
  <!-- 在Vue的:class对象语法中，无论类名是否带引号，最终都会被转换为字符串类型的类名。 -->

  <!-- class可以与:class共存
   这里最后渲染的结果会是
   <div class="font-bold active">{{ text }}</div> -->
  <div 
    class="font-bold"
    :class="{ active: isActive, 'font-szie': hasError }"
    >{{ text }}</div>

  <!-- 也可以直接用声明的对象
   下面会渲染为
   <div class="classObj1">{{ text }}</div> -->
  <div :class="classObj">{{ text }}</div>

  <!-- 也可以用计算属性
   const classObjComputed = computed(() => ({
  classObj1: isActive.value && !hasError.value,
  classObj2: hasError.value || hasError.value === false,
})) -->
  <div :class="classObjComputed">{{ text }}</div>

  <!-- 也可以数组形式 -->
  <!-- 等价于<div class="font-bold classObj1">{{ text }}</div> -->
  <div :class="['font-bold', classObj]">{{ text }}</div>

  <!-- 在数组中有条件的渲染某个class也可以使用三元表达式 -->
  <!-- 等价于<div class="active">{{ text }}</div> -->
  <div :class="[ isActive ? 'active' : '']">{{ text }}</div>

  <!-- 当然,在数组中也可以混合对象和字符串 -->
  <!-- 等价于<div class="active font-bold font-size">{{ text }}</div> -->
  <div :class="[{'active': isActive}, 'font-bold', {'font-size': isActive}]">{{ text }}</div>



  <!-- 关于Style -->
  <!-- 可以和class一样使用对象 -->
   <div :style="{'font-size': fontSize + 'rem'}">{{ styleText }}</div>
  <!-- 推荐直接在js中声明一个对象,这样的style更加直观 -->
   <div :style="styleObj">{{ styleText }}</div>
  <!-- 当然也可以合并style和使用数组进行多个style对象的合并 -->
   <div style="border: 1px solid black;" :style="{'font-size': fontSize + 'rem'}" >{{ styleText }}</div>
   <div :style="[styleObj, styleObj2]" >{{ styleText }}</div>
  <!-- 样式多值 
   可以对一个样式属性提供多个 (不同前缀的) 值，
   数组仅会渲染浏览器支持的最后一个值。
   在这个示例中，
   在支持不需要特别前缀的浏览器中都会渲染为 display: flex。 -->
  <div :style="{ display: ['block', '-webkit-box', '-ms-flexbox', 'flex'] }">
    <p>123123</p>
    <p>456456</p>
  </div>


  <!-- 关于组件 -->
  <!-- 组件可以像下面这样添加类 -->
   <hello class="font-bold" />
   <hello :class="{'active': isActive, 'font-szie': hasError}" />

   <!-- 对于组件里有多个根元素时
    不知道为什么有bug无法传递class
   <towDiv class="font-bold" />    

   无效
   <errorTowDiv class="classObj1"/> -->

</template>

<style scoped>
.active {
  color: red;
}
.font-bold {
  font-weight: bold;
}
.font-size{
  font-size: 2rem;
}
.classObj1{
  color: blue;
}
.classObj2{
  font-size: 2rem;
}
</style>
