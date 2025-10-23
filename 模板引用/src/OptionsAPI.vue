<script>
import { Update } from 'vite';

export default{
    data() {
        return {
            text: '这是选项式API子组件文本',
            num: 0
        }
    },
    methods: {
        UpdateNum(){
            this.num++
        }
    }
}

</script>

<template>
<div>
    <h1>{{ text }}</h1>
    <button @click="UpdateNum">'num:' + {{ num }}</button>
</div>
</template>

<style scoped>
button{
    font-size: 1.2rem;
}
div{
    border: 1px solid black;
}
</style>