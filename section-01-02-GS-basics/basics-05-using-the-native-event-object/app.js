const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: '',
      lastName: ''
    };
  },
  computed: {
    fullname() {
      console.log('computed property fullname is called!')
      if(this.name === '' || this.lastName == ''){
        return '';
      }else{
        return this.name + ' ' + this.lastName;
      }
    }
  },
  watch: {
    name(newVal, oldVal){
      console.log(oldVal + ' changed to ' + newVal);
    },
    counter(value){
      if(value > 50){
        this.counter = 0; 
      }
    }
  },
  methods: {
    add(num) {
      this.counter = this.counter + num;
    },
    reduce(num) {
      this.counter = this.counter - num;
      // this.counter--;
    },
    resetInput() {
      this.name = ''
    }
  }
});

app.mount('#events');
