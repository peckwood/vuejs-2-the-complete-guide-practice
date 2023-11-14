### 108 module introduction

#### component registration and styling

#### slots and dynamic components

#### naming and folder structure

### 110 Global vs local components

#### Global component registration

In main.js

```
import BaseBadge from "@/components/BaseBadge.vue";

app.component('BaseBadge', BaseBadge);
```

#### local component

```
import TheHeader from "@/components/TheHeader.vue";

export default {
  components: {
    TheHeader
  },
  
or
  components: {
    'the-header': TheHeader
  },
or  
    components: {
    TheHeader: TheHeader
  },
```

If your use TheHeader (PascalCase), you can use it as self-closing tag

```
<TheHeader />
```

but self-closing tag is not supported

### 111 scoped styles

Styles that affect everything in your app are defined in <style> inside App.vue

You can add `scope` attribute to your <style> to ensure styles are only applied to current component

behind the scenes, vue uses custom attributes and by adjusting selectors to achieve this.

```
<header data-v-9a9f6144></header>
```

```
header[data-v-9a9f6144] {
	//...
}
```

### 112 introducing slots

slots allows components to receive HTML content from outside, just like props. slot allows you to use your own component as a wrapper around dynamic content. 

Note that styles from parent component that uses a child component for slot will affect child's style, but child's will not affect parent. (only if parent and child share the same selector)

Both parent and child's element will have attribute as parent's scoped style

### 115 More on slots

#### default slot content

```
      <slot name="header">
        Default Header
      </slot>
```

default slot content will be used when no content is passed to slot.

#### this.$slots

this.$slots is a built-in property by vue, it holds information about the slots data this components receives for its different slots.

You can check if we do receive slot data with `this.$slots.mySlotName`.

If didn't receive `this.$slots.mySlotName` will be undefined, and we can hide it in such case:

```
<slot name="header" v-if="$slots.header">
</slot>
```

#### v-slot shorthand

v-slot can be replaced by a shorthand: #.

```
<template #header>
```

