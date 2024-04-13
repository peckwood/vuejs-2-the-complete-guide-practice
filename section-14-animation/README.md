# Section 14: Animations & transitions



### 196 Why is 'just CSS' not enough?

Most of the time, 'JUST CSS' is enough

But there is a problem, when you want to animate the removal of an element, it is detached from DOM, there is no way to animate it with CSS

Vue can help us with animating the appearance and also the disappearance of elements by delaying the disappearance until a certain animation has finished.

### 197 Playing CSS Animations with Vue's Help

1. wrap the element you want to animate with `<transition>`
2. `<transition>` must only contain one element, one direct child 

what does transition do with the wrapped element? 



Animating enter-leave state

element not mounted

1. adds `*-enter-from`, `*-enter-active` class to the element
2. removes `from`, but `active` stays on the element
3. add `*-enter-to` when animation finishes
4. vue finds out how long the process takes by reading its animations and transitions inside its css style

element mounted

1. adds `*-leave-from` and `*-leave-active`
2. removes `from`, and adds `*-leave-to` class
3. vue finds out the duration
4. **remove the element from dom once the duration is over**
5. 



