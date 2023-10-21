Vue.createApp({
    data(){
        return {
            tasks: [],
            newTask: '',
            isListVisible: true
        }
    },
    computed: {
        toggleListVisibilityButtonText() {
            return this.isListVisible ? 'Hide List' : 'Show List';
        }
    },
    methods: {
        addTask(){
            this.tasks.push(this.newTask);
        },
        toggleListVisibility(){
            this.isListVisible = !this.isListVisible;
        }
    }
}).mount('#assignment');