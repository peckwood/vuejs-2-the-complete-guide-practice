### 132 Dynamic Components & Attribute Fallthrough

When you add props or event listeners on custom components, then by default they fall through to the <u>root level element</u> in that custom components template.

#### dynamic components

```
<component :is='currentTab'></component>
```

A question is asked at the end: how to pass props to dynamic component?

use case is the dynamic component can be `<StoredResources>`, which needs a prop

### 133 Adding & Styling Tabs

the previous problem is solved using provide/inject.

To highlight active tab, a computed property is used to decide the base-button's `mode` property, if it is active, it returns `null`. If it is inactive, it returns `flat`

### 134 Adding a form and 135  Fetching User input

Instead of using `v-model` to bind form inputs to data properties, $ref is used to get inputs' value.

Instead of using $emit to submit form data. provide/inject is used to pass a method from `<TheResources>` to `<AddResource>`. the method receives the form data and add it to the list of resources.

`<keep-alive>` is used to cache form input data when tab is switched during form editing.

### 136  Adding a Modal Dialog

Created `base-dialog` component, which used `html <dialog>` to show a popup dialog. `v-if` is used to control its visibility. 

it has 3 slots, header, default and actions.

header has default content: 

```
<header>
      <slot name='header'>
        <h2> {{ title }}</h2>
      </slot>
    </header>
```

An title prop is passed to `base-dialog` to utilize the default slot content.

some paragraphs are passed to the default slot.

An `<base-button>` with `@click` event set is passed into `dialog`'s slot to close it.

### 137 Deleting Items

a delete method is passed from `TheResources` to `LearningResource`.

Note that you should not use 

```
this.storedResources = this.storedResources.filter((res) => res.id !== resId);
```

to remove an item.

You should work on the reference value **directly**, when passing reference value using provide/inject.

> Because of provide inject and how it works. We do provide our storedResources here. Now, vue executes this provide method in the end when it creates this component. So it then injects this storedResources array into all the components that need Resources. The thing is, this is an array, and therefore it's a value stored in memory. It's a **reference value** in JavaScript.
>
> When we change this array by pushing or by unshifting, as we're doing it for adding a Resource, that changes the same array in memory, which we originally provided, and therefore view as able to recognize, the changes we made to it. And all the places that injected this Resources key, will get notified about those changes.
>
> If we however use this approach, I'm overriding this storedResources with a brand new array. And this brand new array is then not re-provided to all the other components. So all the components that inject the Resources are still working with the old, with the original array.

We should work directly on that array, instead:

```
this.storedResources.splice(this.storedResources.findIndex(res => res.id === resId), 1);
```

### 138 Adding 'Teleport'

we used teleport feature to move `base-dialog` to the child of body.
