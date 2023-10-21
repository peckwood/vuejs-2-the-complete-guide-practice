const app = Vue.createApp({
  data() {
    return {
      goals: [],
      newGoal: '',
      myObj: {
        prop1: 'val1',
        prop2: 'val2'
      }
    };
  },
  methods:{
    addGoal(){
      this.goals.push(this.newGoal);
      this.newGoal = '';
    },
    removeGoal(index){
      this.goals.splice(index, 1);
    }
  }
});

app.mount('#user-goals');
