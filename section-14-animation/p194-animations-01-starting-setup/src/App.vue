<template>
  <div class="container">
    <users-list></users-list>
  </div>
  <div class="container">
    <div class="block" :class='{animate: animatedBlock}'></div>
    <button @click='animateBlock'>Animate</button>
  </div>
  <div class='container'>
    <transition
      :css='false'
      @before-enter='beforeEnter'
      @enter='enter'
      @after-enter='afterEnter'
      @enter-cancelled='enterCancelled'
      @before-leave='beforeLeave'
      @leave='leave'
      @after-leave='afterLeave'
      @leave-cancelled='leaveCancelled'
    >
      <p v-show='paragraphIsVisible'>this is only sometimes visible...</p>
    </transition>
    <button @click='toggleParagraph'>Toggle Paragraph</button>
  </div>
  <div class='container'>
    <transition name='fade-button' mode='out-in'>
      <button @click='showUsers' v-if='!usersAreVisible'>Show Users</button>
      <button @click='hideUsers' v-else>Hide Users</button>
    </transition>
  </div>
  <base-modal @close='hideDialog' :open='dialogIsVisible'>
    <p>This is a test dialog!</p>
    <button @click='hideDialog'>Close it!</button>
  </base-modal>
  <div class="container">
    <button @click="showDialog">Show Dialog</button>
  </div>
</template>

<script>
import UsersList from '@/components/UsersList.vue';
export default {
  components: {
    UsersList
  },
  data() {
    return {
      usersAreVisible: true,
      paragraphIsVisible: true,
      animatedBlock: false,
      dialogIsVisible: false,
      enterIntervalId: null,
      leaveIntervalId: null,
      interval: 300
    };
  },
  methods: {
    beforeEnter(ele){
      console.log('beforeEnter', ele)
    },
    enter(ele, done){
      console.log('enter', ele);
      let level = 1;
      const oldOpacity = Number(ele.style.opacity);
      this.enterIntervalId = setInterval(() => {
        ele.style.opacity = oldOpacity + level * 0.1;
        console.log('ele.style.opacity', ele.style.opacity)
        level++;
        if(ele.style.opacity >= 1){
          ele.style.opacity = 1;
          clearInterval(this.enterIntervalId);
          done();
        }
      }, this.interval);
    },
    afterEnter(){
      console.log('afterEnter');
    },
    enterCancelled(){
      console.log('enterCancelled');
      if(this.enterIntervalId){
        clearInterval(this.enterIntervalId);
        this.enterIntervalId = null;
      }
    },
    beforeLeave(){
      console.log('beforeLeave')
    },
    leave(ele, done){
      console.log('leave');
      let oldOpacity = Number(ele.style.opacity);
      if(!oldOpacity){
        oldOpacity = 1;
      }
      console.log('oldOpacity', oldOpacity);
      let level = 1;
      this.leaveIntervalId = setInterval(() => {
        ele.style.opacity = oldOpacity - level * 0.1;
        console.log('ele.style.opacity', ele.style.opacity)
        level++;
        if(ele.style.opacity <= 0){
          ele.style.opacity = 0;
          clearInterval(this.leaveIntervalId);
          done();
        }
      }, this.interval);
    },
    afterLeave(){
      console.log('afterLeave');
    },
    // only available with v-show transitions
    leaveCancelled(){
      console.log('leaveCancelled')
      if(this.leaveIntervalId){
        clearInterval(this.leaveIntervalId);
        this.leaveIntervalId = null;
      }
    },
    showUsers(){
      this.usersAreVisible = true;
    },
    hideUsers(){
      this.usersAreVisible = false;
    },
    toggleParagraph(){
      this.paragraphIsVisible = !this.paragraphIsVisible;
    },
    animateBlock(){
      this.animatedBlock = true;
    },
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}
button {
  font: inherit;
  padding: 0.5rem 2rem;
  border: 1px solid #810032;
  border-radius: 30px;
  background-color: #810032;
  color: white;
  cursor: pointer;
}
button:hover,
button:active {
  background-color: #a80b48;
  border-color: #a80b48;
}
.block {
  width: 8rem;
  height: 8rem;
  background-color: #290033;
  margin-bottom: 2rem;
  //transition: transform 0.3s ease-out;
}
.container {
  max-width: 40rem;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 12px;
}
.animate {
  //transform: translateX(-150px);
  animation: my-slide-scale 0.3s ease-out forwards;
}

/*.v-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}*/
.my-para-enter-active-class-name {
  animation: my-slide-scale 2s ease-out;
}
/*.v-enter-to {
  opacity: 1;
  transform: translateY(0);
}*/
/*.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}*/
.para-leave-active {
  animation: my-slide-scale 1s ease-out;
}
/*.v-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}*/
.fade-button-enter-from, .fade-button-leave-to {
 opacity: 0;
}
.fade-button-enter-to, .fade-button-leave-from {
  opacity: 1;
}
.fade-button-enter-active {
  transition: opacity 0.5s ease-out;
}
.fade-button-leave-active {
  transition: opacity 0.5s ease-in;
}

@keyframes my-slide-scale {
  0% {
    transform: translateX(0) scale(1);
  }
  70% {
    transform: translateX(-120px) scale(1.2);
  }

  100% {
    transform: translateX(-150px) scale(1);
  }
}
</style>