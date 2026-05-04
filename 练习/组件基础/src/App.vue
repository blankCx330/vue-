<script setup>
import {ref, onMounted, shallowRef} from 'vue'
//通过这个来引用别的组件
import clickButton from './components/clickButton.vue';

// 引用的.js文件中使用template需要配置构建工具支持模板编译
// 在vite.config.js的 alias: {} 中加入以下配置
// 'vue': 'vue/dist/vue.esm-bundler.js' // 关键配置
import jsClickButton from './components/jsClickButton.js';
const text = ref('这是组件基础文本')
const jsButtonRef = ref(null);
onMounted(()=>{
  console.log(jsButtonRef.value);
})

// 关于Props
import aboutProps from './components/aboutProps.vue';
import aboutPropsTypeScript from './components/aboutPropsTypeScript';
const titles = ref(['标题1', '标题2', '标题3']);

//关于监听事件
import blogPost from './components/blogPost.vue';
const blogDate = ref([
    {id: 1, title: '博客标题1', post: '博客文章1'},
    {id: 2, title: '博客标题2', post: '博客文章2'},
    {id: 3, title: '博客标题3', post: '博客文章3'}
  ])
const fontSize = ref(1.2)

// 通过插槽来分配内容
import aboutSlot from './components/aboutSlot.vue';

// 动态组件
import componentA from './components/componentA.vue';
import componentB from './components/componentB.vue';

// 提前注册组件
  const components = {
    A:componentA,
    B:componentB
  }

  // 切换组件
  const selectComponent = ref('A')
  const updateComponent = () => {
    selectComponent.value = selectComponent.value === 'A' 
      ? 'B'
      : 'A'
  }
  //有关KeepAlive的使用
  import countComponents from './components/countComponents.vue';
  import inputComponents from './components/inputComponents.vue';

  const KeepAliveComponents = {
    Count: countComponents,
    Input: inputComponents
  }

  const selectKeepAliveComponent = ref('Count')

//DOM 内模板解析注意事项

//大小写区分
// HTML 标签和属性名称是不分大小写的
// 所以浏览器会把任何大写的字符解释为小写。
// 这意味着当你使用 DOM 内的模板时
// 无论是 PascalCase 形式的组件名称、camelCase 形式的 prop 名称
// 还是 v-on 的事件名称
// 都需要转换为相应等价的 kebab-case (短横线连字符) 形式
// 但单文件可以使用 PascalCase 形式的命名以来区分 html 原生的标签


// 闭合标签
import border from './components/border.vue';

</script>







<template>
  <h1>{{ text }}</h1>
  <!-- 
  值得一提的是每个组件都是独立的
  每一个组件都维护着自己的状态，是不同的 count
  这是因为每当你使用一个组件，就创建了一个新的实例。 
  -->
  <!--
    组件实例是 Vue 中最小可复用的功能单元
    每个实例自带数据和方法，彼此独立又协同工作。
  -->
  <clickButton class="red"/>
  <clickButton class="blue"/>
  <br />
  <jsClickButton ref="jsButtonRef" />
  <!-- 在单文件组件中
  推荐为子组件使用 PascalCase 的标签名(也就是驼峰命名)
  以此来和原生的 HTML 元素作区分。 -->


  <!-- 
    注意：这里可以传入数字也可以传入字符串
    但是如果没有在字符串两边加上''的话
    vue会将其识别为一个JavaScriptd的表达式
    "这是aboutProps组件的标题"被当作 ​变量名​ 而非字符串
    若该变量未定义，则传递 undefined，导致子组件无法渲染。
  -->
  <aboutProps :title="'这是字符串'" />
  <aboutProps :title="42" />
  <!-- 
  会触发警告且不会渲染
  <aboutProps :title="这是aboutProps组件的标题" /> 
  -->

  <aboutPropsTypeScript :title="'这是标题'" />

  <!-- 组件也可以使用v-for来渲染 -->
  <aboutProps 
    v-for="title in titles" 
    :key="title"
    :title="title"
  /> 

  <div :style="{ fontSize: fontSize + 'rem' }">
    <blogPost 
      v-for="date in blogDate"
      :key="date.id"
      :id="date.id"
      :title="date.title"
      :post="date.post"
      @addFontSize="fontSize = (fontSize+0.2)%2"
    />
    <!-- @addFontSize 接收来自子组件的事件信号 -->
    <!-- 值得一提的是$emit并不会触发冒泡 -->
  </div>

  <!-- 通过插槽来分配内容 -->
  <!-- 将这里的文本插入进子组件里的<slot />位置 -->
  <!-- <slot />相当一个占位符 -->
  <!-- 实际编译时可以将文本看作替换了<slot />的位置 -->
  <aboutSlot> 这是父组件插入的文本 </aboutSlot>
  <!-- 值得一提的是也可以插入标签 -->
  <!-- 这里替换<slot />的是<p class="red">这是父组件插入的文本</p> -->
  <aboutSlot><p class="red">这是父组件插入的文本</p></aboutSlot>

  <!-- 动态组件 -->
  <component :is="components[selectComponent]"></component>
  <button @click="updateComponent">切换组件</button>

  <!-- 关于KeepAlive的使用 -->
  <!-- 
    KeepAlive简单来说就是会对切换的组件进行缓存
    以保留组件切换前的数据
    max属性是可缓存的最大组件数(自动遗忘最久没有被访问的缓存实例将被销毁) 
  -->
   <div class="KeepAlive-div">
    <input type="radio" value="Count" v-model="selectKeepAliveComponent">
    Count</input>
    <input type="radio" value="Input" v-model="selectKeepAliveComponent">
    Input</input>
    <br/>
    未使用KeepAlive
    <component :is="KeepAliveComponents[selectKeepAliveComponent]"></component>
    <br/>
    使用了KeepAlive
    <KeepAlive max="3">
      <component :is="KeepAliveComponents[selectKeepAliveComponent]"></component>
    </KeepAlive>
  </div>

  <!-- 闭合标签 -->
   <border />
   <p>闭合标签</p>
  <!-- 
  这里没有发生异常
  是因为Vue 的模板解析器支持任意标签使用 /> 作为标签关闭的标志 
  -->
  <!-- 
  在 DOM 内模板中，我们必须显式地写出关闭标签 
  这是由于 HTML 只允许一小部分特殊的元素省略其关闭标签
  最常见的就是 <input> 和 <img>。
  对于其他元素来说会解析为:
  <border>
    <p>闭合标签</p>
  </border>
  -->


  <!-- 元素位置限制 -->
  <!-- 
    某些 HTML 元素对于放在其中的元素类型有限制
   例如 <ul>，<ol>，<table> 和 <select>
   相应的某些元素仅在放置于特定元素中时才会显示
   例如 <li>，<tr> 和 <option></option> 
  -->
  <table>
    <border />
  </table>
  <!-- 
    这里没有发生异常的原因与
    <border />被正确解析则与 Vue 的模板解析机制有关。 
  -->
  <!-- 
    在 DOM 内模板中
    我们可以使用is="你的模板"来进行替换元素
    例如上面的代码可以写成
    <table>
      <tr is="vue:border"></tr>
    </table>
    注意:
    is是 HTML 的标准属性
    通过添加 vue:前缀
    Vue 明确告知解析器这是一个 ​Vue 组件
    而非原生属性或元素。
  -->
    <!--
    不会渲染
    <table>
      <tr is="border"></tr>
    </table> 
    -->

</template>

<style scoped>
.red{
  color: #fff;
  background-color: red;
}
.blue{
  color: #fff;
  background-color: blue;
}
.KeepAlive-div{
  width: 300px;
  height: 150px;
  border: 2px solid black;
  background-color: aquamarine;
}
</style>
