<script setup>
import { ref, computed } from 'vue';
  
  //computed()方法期望接收一个getter函数作为参数
  //返回一个计算属性ref对象
  //Vue 的计算属性会自动追踪响应式依赖
  //当ref对象发生变化时computed()会重新计算一次函数值
  let ok = ref(true);
  const okState = computed(()=> ok.value ? 'ok' : 'not ok');

  //这里没有ref对象computed()没有追踪到ko2的变化,不会重新计算函数值
  //所以视图不会发生变化
  const ok2StateComputed = computed(()=> ok2 ? 'ok2' : 'not ok2');

  //没有ref对象,即使ok2变化,视图也只会进行第一次计算
  let ok2 = true;
  const ok2State = () => ok2 ? 'ok2' : 'not ok2'
  const updateOk2 = () => {
    ok2 = !ok2;
    console.log('ok2 is now', ok2);
  };

  // 这样的函数也可以使视图发生变化
  // 但此方法总是会在重渲染发生时再次执行函数
  // 当变量不变时函数结果并不会改变
  // 在vue中重渲染是频繁
  // 因此多次计算同一结果的函数是对性能的一种浪费
  let ok3 = ref(true);
  const ok3State = () => ok3.value ? 'ok3' : 'not ok3';
  const updateOk3 = () => {
    ok3.value = !ok3.value;
    console.log('ok2 is now', ok3.value);
  };

  // computed()返回的ref对象是只读的
  // 当尝试修改时会报错
  // okState = false;报错,computed()返回的ref对象是只读的

  //可写计算属性
  const firstName = ref('阿哈');
  const lastName = ref('阿基维利');

  // 通过传入一个包含getter和setter的对象来创建一个可写的计算属性
  // 在使用fullName.value时会调用getter
  // 在给fullName.value赋值时会调用setter
  // 这其实类似“重写”但只是方便理解
  const fullName = computed({
    get() {
      return firstName.value;
    },
    set(newValue) {
      firstName.value = newValue;
    }
  })
  console.log(fullName.value); // 阿哈
  const updateName = () => {
    fullName.value = lastName;
    console.log(fullName.value); // 阿基维利
  }

  // 获取上一个值
  const num = ref(2);
  const alwaysSmall = computed((previous)=>{
    if(num.value <= 5){
      return num.value
    }

    return previous
  })
  console.log(alwaysSmall.value);

</script>

<template>
  <div>{{ okState }}</div>
  <button @click="ok = !ok">Toggle Ok</button>

  <!-- 视图不会发生变化 -->
  <div>{{ ok2State() }}</div>
  <div>{{ ok2StateComputed }}</div>
  <button @click="updateOk2">Toggle Ok2</button>

  <!-- 视图发生变化 -->
  <div>{{ ok3State() }}</div>
  <button @click="updateOk3">Toggle Ok3</button>

  <div>{{ firstName }}</div>
  <button @click="updateName">updateName</button>

  <div>alwaysSmall:{{ alwaysSmall }}</div>
  <input v-model="num" type="number"></input>
  <button @click=""></button>
</template>

<style scoped>

</style>
