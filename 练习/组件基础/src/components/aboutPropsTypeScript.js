export default{
    // 值得一提的是这里也不需要暴露title
    props:['title'],
    setup(props){
        console.log('aboutPropsTypeScript组件打印:'+props.title)
    },
    template: `
    <h4>{{ title }}</h4>
    `
}