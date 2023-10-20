Vue.createApp({
    data(){
        return {
            name: 'Raiden',
            age: 22,
            imgUrl: 'https://i.postimg.cc/SNgQhKCS/cat.jpg',
            value: 'hello'
        }
    },
    methods: {
        getRandomNumber(){
            return Math.random();
        }
    },
    computed: {
        randomNumber(){
            return Math.random();
        }
    }
}).mount('#assignment')