# Section 14: Animations & transitions



### 196 Why is 'just CSS' not enough?

Most of the time, 'JUST CSS' is enough

But there is a problem, when you want to animate the removal of an element, it is detached from DOM, there is no way to animate it with CSS

Vue can help us with animating the appearance and also the disappearance of elements by delaying the disappearance until a certain animation has finished.

### 197 Playing CSS Animations with Vue's Help

1. wrap the element you want to animate with `<transition>`
2. `<transition>` must only contain one element, one direct child 

#### what does transition do with the wrapped element? 

Animating enter-leave state

element not mounted

1. mount element
2. adds `*-enter-from`, `*-enter-active` class to the element
3. removes `from`, but `active` stays on the element, add `*-enter-to` when animation finishes
4. vue finds out how long the process takes by reading its animations and transitions inside its css style
5. after the duration, removes `acitve` and `to`

element mounted

1. adds `*-leave-from` and `*-leave-active`
2. removes `from`, and adds `*-leave-to` class
3. vue finds out the duration
4. **remove the element from dom once the duration is over**

element not mounted

### 198 Using the Transition Component

```
    <transition>
      <p v-if='paragraphIsVisible'>this is only sometimes visible...</p>
    </transition>
```

```css
.v-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.v-enter-active {
  transition: all 5s ease-out;
}
.v-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.v-leave-active {
  transition: all 5s ease-in;
}
.v-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
```

Note: this is only necessary for elements that use `v-if` or `v-show`

### 199 CSS Animations with the Transition Component

```
    <transition>
      <p v-if='paragraphIsVisible'>this is only sometimes visible...</p>
    </transition>
```

```css
.v-enter-active {
  animation: my-slide-scale 0.3s ease-out;
}
.v-leave-active {
  animation: my-slide-scale 0.3s ease-out;
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
```

we don't need `forwards` because after animation ends, `active` class  will be removed and component  will not remember the animation

### 200 Using Custom CSS Class Names

If you have multiple elements that need to have `<transition>`, you cant let them all use the same CSS classes `v-enter-*`...

`v-enter-*` is the **default** class

to specify a **custom prefix**:

```
<transition name='para'>
      <p v-if='paragraphIsVisible'>this is only sometimes visible...</p>
</transition>
```

```
.para-enter-active {
  animation: my-slide-scale 0.3s ease-out;
}
.para-leave-active {
  animation: my-slide-scale 0.3s ease-out;
}
```

**totaly custom CSS class names**:

```
    <transition name='para' enter-active-class='my-para-enter-active-class-name'>
      <p v-if='paragraphIsVisible'>this is only sometimes visible...</p>
    </transition>
```

```
.my-para-enter-active-class-name {
  animation: my-slide-scale 0.3s ease-out;
}
```

### 201 Example: Animating a Modal

You can use `<transition>` on custom components just like elements

```
  <transition name='modal'>
    <base-modal @close='hideDialog' v-if='dialogIsVisible'>
      <p>This is a test dialog!</p>
      <button @click='hideDialog'>Close it!</button>
    </base-modal>
  </transition>
```

but your custom class prefix will fall through to the root element of component. 

> A "fallthrough attribute" is an attribute or `v-on` event listener that is passed to a component, but is not explicitly declared in the receiving component's [props](https://vuejs.org/guide/components/props) or [emits](https://vuejs.org/guide/components/events#declaring-emitted-events). Common examples of this include `class`, `style`, and `id` attributes.

`<base-modal>` has 2 root elements

```
<template>
  <div class="backdrop" @click="$emit('close')"></div>
  <dialog open>
    <slot></slot>
  </dialog>
</template>
```

we have to comment out `<div>` to make `<dialog>` animate

the `<transition>` component wants one direct child element, event though `<base-model>` satisfies, it is only a wrapper of 2 root elements.

2 choices:

1. we wrap div and dialog each in their own transition component
2. we wrap dialog in transition inside BaseModal.vue, we choose this one

dialogIsVisible was used to control if base-modal exists, now we pass it as prop to control if dialog exists, also div, to control the backdrop

### 202 Transitioning Between Multiple Elements

1. the `<transition>` component only accepts one direct child element. But there is an **exception**, if you guarantee that at most 1 is added to the dom, you can have multiple elements.

2. we need to use v-else to give vue a clear signal : v-else
3. we need to set the mode to `out-in`  to avoid both buttons are shown

```
    <transition name='fade-button' mode='out-in'>
      <button @click='showUsers' v-if='!usersAreVisible'>Show Users</button>
      <button @click='hideUsers' v-else>Hide Users</button>
    </transition>
```

```
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
```

### 203 Using Transition Events

sometimes you want to use JS 

1. as part of transition
2. control the entire transition
3. change style through JS
4. do something when an animation starts or ends

you can achieve this with the help of transition events

```
    <transition
      name='para'
      enter-active-class='my-para-enter-active-class-name'
      @before-enter='beforeEnter'
      @enter='enter'
      @after-enter='afterEnter'
      @before-leave='beforeLeave'
      @leave='leave'
      @after-leave='afterLeave'
    >
```

```
    beforeEnter(ele){
      console.log('beforeEnter', ele)
    },
    enter(ele){
      console.log('enter', ele);
    },
    afterEnter(){
      console.log('afterEnter');
    },
    beforeLeave(){
      console.log('beforeLeave')
    },
    leave(){
      console.log('leave')
    },
    afterLeave(){
      console.log('afterLeave')
    },
```

the event listeners take an element, you can perform actions on it.

### 204  Building JavaScript Transitions (instead of CSS)

you need to tell Vue when you are done in this hook if you have JS-based animations. you dont need this if you have CSS-based animations. 

```
    enter(ele, done){
      console.log('enter', ele);
      let level = 1;
      const intervalId = setInterval(() => {
        ele.style.opacity = level * 0.05;
        level++;
        if(ele.style.opacity >= 1){
          clearInterval(intervalId);
          done();
        }
      }, 20);
    }
```

if you dont call `done()`, it will execute instantly with enter hook.

There is a problem, when you click the button before the transition ends, it will flicker, since both transitions are playing.

we can use `@enter-cancelled` and `@leave-cancelled`
