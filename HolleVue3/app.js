  const { createApp } = Vue

  createApp({
    setup() {
      return {
        text: 'Hello Vue 3!'
      }
    }
  }).mount('#app')