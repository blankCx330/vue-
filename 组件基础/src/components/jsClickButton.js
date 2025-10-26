import {ref} from 'vue'

// 这是一个用js来定义的组件
// export default
// 功能​：作为 JavaScript ES6 模块系统的标准语法
// 用于导出模块的默认值（单个值）。
export default{
    // setup
    // 在 Vue3 中替代 Vue2 的 data、methods等选项
    // 用于组织组件逻辑
    // 支持响应式数据、生命周期钩子、计算属性等。
    setup(){
        const count = ref(0)
        return { 
            count 
        }
    },
    //下面的
    template: `
    <button @click="count++">
      JSbutton:{{ count }}
    </button>`
}