Vue.createApp({
    data() {
        return {
            box1Selected: false,
            box2Selected: false,
            box3Selected: false
        }
    },
    computed: {
        box1Class() {
            return {
                active: this.box1Selected
            }
        },
        box2Class() {
            return {
                active: this.box2Selected
            }
        },
        box3Class() {
            return {
                active: this.box3Selected
            }
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