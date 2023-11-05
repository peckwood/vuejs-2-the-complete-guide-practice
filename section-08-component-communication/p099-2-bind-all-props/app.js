const app = Vue.createApp({
    data() {
        return {
            note: {
                p1Content: 'aaa',
                p2Content: 'bbb'
            }
        }
    },
});

app.component('MyNote', {
    // if you dont want to inherit attributes, set inheritAttrs to false
    // inheritAttrs: false,
    props: ['p1Content', 'p2Content'],
    template: `
        <section>
            <p>{{p1Content}}</p>
            <p>{{p2Content}}</p>
        </section>
    `,

});

app.mount('#app');