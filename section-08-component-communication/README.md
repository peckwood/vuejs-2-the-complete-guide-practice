### 93 props behavior & changing props

Props typically should not be mutated

#### One-way data flow

If you try to change props value inside its owner component, you will get compile error: `Unexpected mutation of "isFavorite" prop`

Vue uses a concept called unidirectional data flow: data passed from parent component to child should only be changed in parent. 

If child wants to change prop, it needs to 

1. notify its parent to do the change instead

2. take the received data as the initial data, and change the data instead of received data (parent data will not be changed)

   1. add new data property

      ```
        data() {
          return {
            isFavoriteLocal: this.isFavoriteProp
          };
        }
      ```

### 93 validating prop

The minimum you can type is props: `['prop1', 'prop2']`

You can set prop type, required, default and validator

```vue
props: {
	prop1: String,
	prop2: {
		type: String,
		required: true
	},
    prop3: {
		type: String,
		requried: false,
		default: '1',
		validator: function(value) {
			//should return true or false
			return true;
		}
    }
}
```

default can be a function 

```
    prop3: {
		type: String,
		requried: false,
		default: function() {return '3'}
    }
```

If we miss required prop, we will get a warning in console

#### supported prop types

- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol

### 98 Defining & Validating Custom Events

You can define custom events just like props, but it is not required like props, it is recommended.

emits property lists what event can you emit

```
emits: ['toggle-favorite']
```

You can validate emits:

```
    'toggle-favorite': function(newVal){
      if(newVal) {
        return true;
      }else{
        console.warn('newVal is missing');
        return false;
      }
    }
```

newVal is emit data, which is checked for validation. When you actually do $emit, and the event argument doesn't pass validation, a warning will appear in console: `Invalid event arguments`

### 99-1 prop event fallthrough

A "fallthrough attribute" is an attribute or `v-on` event listener that is passed to a component, but is not explicitly declared in the receiving component's [props](https://vuejs.org/guide/components/props) or [emits](https://vuejs.org/guide/components/events#declaring-emitted-events). Common examples of this include `class`, `style`, and `id` attributes.

When a component renders a single root element, fallthrough attributes will be **automatically** added to the **root element**'s attributes.

This can be handy to build "utility" or pure presentational components where you don't want to define all props and events individually.

If you do **not** want a component to automatically inherit attributes, you can set `inheritAttrs: false` in the component's options.

#### Note:

- Unlike props, fallthrough attributes preserve their original casing in JavaScript, so an attribute like `foo-bar` needs to be accessed as `$attrs['foo-bar']`.

### Assignment 6

#### Note

1. declare components inside an object, not an array

   ```
   components: { Comp1, Comp2 }
   ```

2. do not emit existing event:

   ```
   <form @submit.prevent="submitForm">
   ```

   ```
       submitForm(){
         const newUserCopy = {...this.newUser};
         this.$emit('submit', newUserCopy);
       }
   ```

   is wrong, replace `submit` with some other custom event name

### 103 provide and inject

You can use provide and inject. a pattern you can use to provide data in one place and inject it, which means use it, in another place.

You can only inject what has been provided in an **accestor** component of current component

In ancestor component:

```
  provide: {
	myObj: {
		prop1: 'value1'
	}
  },
```

access in child component:

```
inject: ['myObj'],
```

The Basics: you can not access prop1 with `this.myObj`

**Note:** If you already have `myObj` in ancestor as a data property, you can reuse it.

```
provide() {
	return {
		myObj: this.myObj
	}
}
```

**Note:** If the data in provide is changed, child's injected data is also changed

