const app = Vue.createApp({
  data() {
    return {
      currentUserInput: '',
      message: 'Vue is great!',
    };
  },
  methods: {
    saveInput(event) {
      this.currentUserInput = event.target.value;
    },
    setText () {
      this.message = this.$refs.userInput.value;
    },
  },
  beforeCreate(){
    console.log('beforeCreate()');
  },
  created(){
    console.log('created()');
  },
  beforeMount(){
    console.log('beforeMount()');
  },
  mounted(){
    console.log('mounted()');
  },
  beforeUpdate() {
    console.log('beforeUpdate()');
  },
  updated() {
    console.log('updated()');
  },
  beforeUnmount() {
    console.log('beforeUnmount()');
  },
  unmounted() {
    console.log('unmounted()');
  }
});
app.mount('#app');

setTimeout(function(){
  // app.unmount('#app');
}, 3000);


const app2 = Vue.createApp({
  template: `
    <p>{{ favoriteMeal }}</p>
  `,
  data() {
    return {
      favoriteMeal: 'tomato'
    };
  },
  methods: {
  },
});
app2.mount('#app2');

let message = 'Hello!';
let longMessage = message + ' World';
console.log(longMessage);
message = 'Hello!!!';
// longMessage doesn't change, because Javascript by default is not reactive
console.log(longMessage);

console.log('================================')
const data = {
  message: 'Hello ',
  longMessage: 'Hello World!'
}

const handler = {
  set(target, key, value){
    console.log(target);
    console.log(key);
    console.log(value);
    if(key === 'message'){
      target.longMessage = value + ' world!'
    }
  }
}

const proxy = new Proxy(data, handler);

proxy.message = 'Hello!!!';
console.log(proxy.longMessage)