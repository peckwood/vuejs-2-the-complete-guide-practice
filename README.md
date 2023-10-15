# Section 1 Getting Started

## gs-01-starting-project

is a web application where you can add goals to a goal list.

First show how to do it with JS, then shows how to do it with Vue.



### basics-03-events-starting-code

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

26. ### Locking Content with v-once

You can use v-once to lock initial value

```
<p v-once>Initial counter: {{ counter }}</p>
```

