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

### 113 named slots

In order to differentiate them. you need to name slots when you have more than 1 slot. The unnamed slot is the default slot.

define named slot:

```
<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <slot></slot>
  </div>
</template>
```

use named slot:

```
<BaseCard>
  <template v-slot:header>
    <h3>{{ fullName }}</h3>
    <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
  </template>
  <p>{{ infoText }}</p>
</BaseCard>
```

### 114 slot styles and compilation

#### scoped styles applies to child component's <u>root node</u>

With `scoped`, the parent component's styles will not leak into child components. However, a child component's <u>root node</u> will be affected by both the parent's scoped CSS and the child's scoped CSS. This is by design so that the parent can style the child root element for layout purposes.

#### Scoped styles applies to slotted content

- Scoped styles don't apply to child component templates
- But they can affect global styles and slotted content from the parent

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
