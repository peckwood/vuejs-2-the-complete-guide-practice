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

When you $emit, and the event argument doesn't pass validation, a warning will appear in console
