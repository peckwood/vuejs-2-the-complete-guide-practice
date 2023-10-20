const app = Vue.createApp({
    data() {
        return {
            counter: 10,
            name: '',
            confirmedName: '',
            name1: ''
        };
    },
    methods: {
        add(num) {
            this.counter += num;
        },
        subtract(num) {
            this.counter -= num;
        },
        setName1(event, lastName) {
            this.name1 = event.target.value + ' ' + lastName;
        },
        onSubmit(event) {
            event.preventDefault();
            alert('Submitted!')
        },
        confirmInput() {
            this.confirmedName = this.name1;
        }
    }
});

app.mount('#events');
