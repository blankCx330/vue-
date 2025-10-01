<script setup>
import { ref, computed } from 'vue';
const text = ref('这是文本');
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

  <!-- 关于组件 -->
  <!-- 组件可以像下面这样添加类 -->
   <hello class="font-bold" />
   <hello :class="{'active': isActive, 'font-szie': hasError}" />

   <!-- 对于组件里有多个根元素时 -->
   <towDiv class="font-bold" />    

   <!-- 无效 -->
   <errorTowDiv class="classObj1"/>

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
