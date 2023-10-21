### 40. Understanding the Problem

### 41 Rendering Content Conditionally (lists-cond-01-starting-setup)

### 42 v-if, v-else and v-else-if

v-else can only be used on an element that comes **directly after** an element with v-if on it.

### 43 Using v-show Instead Of v-if

v-if and v-show difference: v-if removes and adds elements from and to the DOM, it really impacts which elements are part of the DOM. v-show hides and show items with CSS.

You should typically use v-if and only fall back to v-show if you have an element which visibility status changes a lot

### 44 Rendering Lists of Data

```
<li v-for="(goal, index) in this.goals">{{ goal }}</li>
```

### 45 Diving Deeper Into v-for

#### we can loop through array

```
<li v-for="(goal, index) in this.goals">{{ index }} - {{ goal }}</li>
```

#### loop through object's properties

```
<li v-for="(val, prop) in this.myObj">{{ prop }} - {{ val }}</li>
```

#### loop through numbers

```
<li v-for="num in 3">{{ num }}</li>
```

### 46 Removing List Items

### 47 Lists & Keys

You can use the `.stop` modifier to stop propagation to parent element

```
<input type="text" @click.stop/>
```

You should make it a habit to use key to uniquely identify every item, which prevents bugs

index is not ideal for keys as they are not attached to the element. A good example would be database primary keys.

```
<li v-for="(goal, index) in this.goals"
            @click="removeGoal(index)"
            :key="goal"
        >
          <p>{{ index }} - {{ goal }}</p>
          <input type="text" @click.stop/>
        </li>
```

