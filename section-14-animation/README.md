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

