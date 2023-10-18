# Section 1 Getting Started

### 5 Building A First App With Just JavaScript  (code:  gs-01)

is a web application where you can add goals to a goal list.

First show how to do it with JS, then shows how to do it with Vue.

### 7 Re-building the app with Vue

# Section 2 Basics and Core Concepts - DOM Interaction with Vue

### 14 (basics-01)

### 21 Understanding Event Binding (code: basics-03)

### 25 Explore Event Modifiers

### .prevent prevents default behavior

When you create a form and click a button inside it, the default behavior is to submit form, which reloads the page and lose the data in page. To prevent default event behavior, you can use event modifier `prevent`:

```
<form @submit.prevent="onSubmit">
	...
</form>
```

```
    onSubmit(){
      alert('Submitted!')
    }
```



another solution, call preventDefault() manually

```
    onSubmit(event){
      event.preventDefault();
      alert('Submitted!')
    }
```

#### .keyup.enter track key events

The following event will trigger when enter key is up

```
<input type="text" @input="setName1($event, 'Liu')" @keyup.enter="confirmInput"/>
```

### 26 Locking Content with v-once

You can use v-once to lock initial value

```
<p v-once>Initial counter: {{ counter }}</p>
```

### 27 Data Binding + Event Binding = Two-Way Binding (code: basics-05)

### 28. Methods used for Data Binding: How It Works

You can use methods to display content based on variable, but it has one drawback

```
<p>Your Name: {{ outputFullname() }}</p>
```

```js
    outputFullname(){
      console.log('I run when counter is changed')
      if(this.name === ''){
        return '';
      }else{
        return this.name + ' Liu';
      }
    }
```

Whenever other variables are updated, outputFullname is also called

Whenever anything on the page changes, Vue executes any method you're using in your HTML code between {}, or with v-html, or with v-html, so any non-event bound method will be re-executed.

### 29. Introducing Computed Properties

Computed properties are like methods, but Vue is aware of their dependencies and only re-executes them if one of them change. 

We use them like data properties.

We don't use them like methods.

It's better to use computed properties then methods for outputting values, performance-wise

### 30. watchers

watcher name must match data property or computed property name

computed property are better when there are multiple dependencies

Watchers scenarios:

- something may or may not happen when value changes
- send http requests if certain values change
- timers if certain values change

### 31 methods vs computed vs watch

#### methods

- can use with event-binding or data-binding
- for data-binding , method is executed for every re-render, which is probably bad
- So, use for events or data that really needs to be re-evaluated all the time

#### computed

- data-binding
- only re-evaluated when one of their 'used value' change
- use for data that depends on other data

#### watch

- not used directly in template, but you can watch any property, even computed properties with them
- allow you to run any code in reaction to some changed data
- use for any non-data update you want to make

### 33 Dynamic Styling with Inline Styles (code: basics-10)

Vue has a special binding syntax that allow you to change inline style dynamically

```
:style="{'border-color': box1Selected ? 'red' : '#ccc'}"
```

### 34  Adding CSS Classes Dynamically

```
      <div
              class="demo"
              :class="{active: box2Selected}"
              @click="onClickBox(2)"
      ></div>
```

### 35 Classes & Computed Properties

```
      <div
              class="demo"
              :class="box1Class"
              @click="onClickBox(1)"
      ></div>
```

```
    computed: {
        box1Class() {
            return {
                active: this.box1Selected
            }
        }
    },
```





