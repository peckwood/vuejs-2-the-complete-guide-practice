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
                this.box1Selected = !this.box1Selected;
            }else if(box === 2){
                this.box2Selected = !this.box2Selected;
            }else {
                this.box3Selected = !this.box3Selected;
            }
        }
    }
}).mount('#styling');