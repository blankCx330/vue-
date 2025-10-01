<script setup>
    defineOptions({ inheritAttrs: false })
</script>
<!-- <template>
      <div>这是没有$attrs.class的div</div>
      <div :class="$attrs.class">这是有$attrs.class的div</div>
</template> -->
<template>
  <div>无 class 绑定</div>
  <div :v-bind="$attrs">手动绑定 $attrs.class</div>
</template>
<style scoped>
.red {
  color: red;
}
</style>