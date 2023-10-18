Vue.createApp({
    data(){
        return {
            newClass: '',
            paragraphVisible: true,
            backgroundColor: ''
        }
    },
    methods: {
        toggleParagraphVisibility(){
            this.paragraphVisible = !this.paragraphVisible;
        }
    },

    computed: {
      pClass(){
          return {
              user1: this.newClass === 'user1',
              user2: this.newClass === 'user2',
              visible: this.paragraphVisible,
              hidden: !this.paragraphVisible
          }
      },
        pStyle(){
          return {'background-color': this.backgroundColor};
        }
    }
}).mount('#assignment');