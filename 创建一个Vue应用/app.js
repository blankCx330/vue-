const {createApp, ref}  = Vue;

const app = createApp({
    setup(){
        const num = ref(10);
        return {
            num
        }
    }
});
app.mount("#app");