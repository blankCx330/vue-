<script setup>
    defineOptions({ inheritAttrs: false })
    import { useAttrs } from 'vue';
    const attrs = useAttrs();
</script>
<!-- <template>
      <div>这是没有$attrs.class的div</div>
      <div :class="$attrs.class">这是有$attrs.class的div</div>
</template> -->
<template>
  <div>无 class 绑定</div>
  <div :class="attrs.class">手动绑定 $attrs.class</div>
</template>
<style scoped>
.red {
  color: red;
}
</style>