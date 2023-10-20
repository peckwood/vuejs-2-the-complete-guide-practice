let app = Vue.createApp({
    data() {
        return {
            courseGoalA: 'Learn Vue A!',
            courseGoalB: 'Learn Vue B!',
            courseGoalHTML: '<h2 style="color: blue">Learn Vue B!</h2>',
            vueLink: 'https://vuejs.org'
        };
    },
    methods: {
        outputGoal(){
            const randomNumber = Math.random();
            if(randomNumber < 0.5){
                return this.courseGoalA;
            }else{
                return this.courseGoalB;
            }
        }
    }
});
app.mount('#user-goal')