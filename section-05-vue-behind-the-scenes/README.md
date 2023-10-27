### 60 An Introduction to Vue's Reactivity

Vue turns your data object into a reactive data object by essentially wrapping your properties with a JavaScript feature called Proxies.

in JavaScript there's a built in feature,which is called Proxy, which Vue leverages under the hood to wrap your properties here and to be notified whenever you assign a new value, like here with message. When I set a new value to message, no matter if data is another data property or a hard coded string like this, no matter what it is, when you assign a new value to message Vue is made aware of that.

Javascript is by default not reactive:

```
let message = 'Hello!';
let longMessage = message + ' World';
console.log(longMessage);
message = 'Hello!!!';
// longMessage doesn't change, because Javascript by default is not reactive
console.log(longMessage);
```

Vue uses Javascript's proxy feature to keep reactive

```
const data = {
  message: 'Hello ',
  longMessage: 'Hello World!'
}

const handler = {
  set(target, key, value){
    console.log(target);
    console.log(key);
    console.log(value);
    if(key === 'message'){
      target.longMessage = value + ' world!'
    }
  }
}

const proxy = new Proxy(data, handler);

proxy.message = 'Hello!!!';
console.log(proxy.longMessage)
```

### 62 One app vs multiple apps

Vue apps are independent from each other. one data property in one app cannot be used in another

### 63 Understanding templates

### 64 Refs

Ref allows you to retrieve values from DOM elements when you need them, instead of all the time

Ref is a non-default HTML attribute, so browser doesn't know it, but vue understands it.

add ref attribute

```
<input type="text" ref="userInput">
```

use ref:

```
this.$refs.userInput.value;
```

