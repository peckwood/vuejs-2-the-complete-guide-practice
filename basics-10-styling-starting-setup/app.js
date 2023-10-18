Vue.createApp({
    data() {
        return {
            box1Selected: false,
            box2Selected: false,
            box3Selected: false
        }
    },
    methods: {
        onClickBox(box){
            if(box === 1){
                this.box1Selected = true;
            }else if(box === 2){
                this.box2Selected = true;
            }else {
                this.box3Selected = true;
            }
        }
    }
}).mount('#styling');