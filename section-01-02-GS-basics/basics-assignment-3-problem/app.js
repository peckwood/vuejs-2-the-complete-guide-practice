Vue.createApp({
    data(){
        return {
            counter: 0,
        }
    },
    methods: {
        increase(amount){
            this.counter += amount;
        }
    },
    computed: {
        result(){
            if(this.counter < 37){
                return 'Not there yet';
            }else if(this.counter > 37){
                return 'Too much!';
            }else{
                return 'Bingo!'
            }
        }
    },
    watch: {
        counter(value){
            // if(value === 37){
            //     setTimeout(function(){
            //         this.counter = 0;
            //     }, 1000);
            // }
            if(value === 37){
                setTimeout(() => {
                    this.counter = 0;
                }, 1000);
            }
        }
    }
}).mount('#assignment');