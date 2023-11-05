const app = Vue.createApp({
    data() {
        return {
        }
    },
    methods: {
        onClick1(){
            console.log('clicked!');
        }
    }
});

app.component('MyButton', {
    // if you dont want to inherit attributes, set inheritAttrs to false
    // inheritAttrs: false,
    template: `
        <button>Click me</button>
    `,
    data(){
        return {
        }
    },
    mounted(){
        console.log('this.$attrs:', this.$attrs)
    },
});

app.mount('#app');