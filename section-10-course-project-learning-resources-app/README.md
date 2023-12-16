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

### 134 Adding a form

Instead of using `v-model` to bind form inputs to data properties, $ref is used to get inputs' value.

Instead of using $emit to submit form data. provide/inject is used to pass a method from `<TheResources>` to `<AddResource>`. the method receives the form data and add it to the list of resources.

`<keep-alive>` is used to cache form input data when tab is switched during form editing.

