# Section 9: Diving Deeper Into Components

### - 108 module introduction

#### - component registration and styling

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

Styles that affect everything in your app are defined in <style> (not scoped) inside App.vue

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

### 116 scoped slots

The concept of scoped slots is about letting you pass data from inside the component where you defined a slot to the component where you pass the markup for the slot.

#### define properties in child (CourseGoals.vue)

```
<template>
  <ul>
    <li v-for="goal in goals" :key="goal">
      <slot :item="goal" otherContent="..."></slot>
    </li>
  </ul>
</template>
```

#### user properties in parent (App.vue)

```
    <course-goals #default="slotProps">
        <h2>{{ slotProps.item }}</h2>
        <p>{{ slotProps.otherContent }}</p>
    </course-goals>
```

#### default slot simplification

Condition: When there is **ONLY** default slot, which means there are no named slots

```
    <course-goals>
      <template #default="slotProps">
        <h2>{{ slotProps.item }}</h2>
        <p>{{ slotProps['another-prop'] }}</p>
      </template>
    </course-goals>
```

can be simplified to 

```
    <course-goals #default="slotProps">
      <h2>{{ slotProps.item }}</h2>
      <p>{{ slotProps['anotherProp'] }}</p>
    </course-goals>
```

#### automatically camelCase conversion

Despite what the video said, `another-prop` is automatically converted to camelCase by Vue, so I had to use `{{ slotProps['anotherProp'] }}`

### 117 dynamic component

```
<component :is="activeComponent"></component>
```

### 118 keep dynamic component alive

when we switch our components, the old component is destroyed and removed from DOM. If there are input contents inside component, it is lost.

To keep component alive:

```
    <keep-alive>
      <component :is="activeComponent"></component>
    </keep-alive>
```

### 119 Applying What We Know & A Problem

You can get an input's value via ref:

```
<input type="text" ref="goal"/>
```

```
const enteredValue = this.$refs.goal.value;
```

The concept of slots is so powerful.

We can add the content for a totally different component (error-alert) in the component (ManageGoals) where we have all the logic for showing the error alert component.

So we don't need to pass data around with custom events, which the error alert emits here.

Instead, we can handle everything here in the component where the error is generated and yet hand off the styling and the markup of that dialogue to a totally different component.

Which is a really nice way of splitting responsibility it's a nice pattern to see

### 120 teleporting elements

`<Teleport>` is a built-in component that allows us to "teleport" a part of a component's template into a DOM node that exists outside the DOM hierarchy of that component.

```
  <teleport to="body">
    <my-element>
  </teleport>
```

The `to` target of `<Teleport>` expects a CSS selector string or an actual DOM node. Here, we are essentially telling Vue to "**teleport** this template fragment **to** the **`body`** tag".

### 121 fragments

In Vue 3, components now have official support for multi-root node components, i.e., fragments!

In 2.x, multi-root components were not supported and would emit a warning when a user accidentally created one. As a result, many components are wrapped in a single `<div>` in order to fix this error.

### 122 style  guide

[Style Guide — Vue.js (vuejs.org)](https://v2.vuejs.org/v2/style-guide/)

Vue 3 style guide is incomplete

### 124 summary

#### Component Registration

component can be registered **globally or locally**: Prefer **local** registration

Styles can also be **global or scoped** to a component. Prefer scoped for most components

#### Slots

**Slots** can be used to add a "**placeholder**" for dynamic HTML code

**Multiple, named** slots are possible

default fallbacks can be provided

**Scoped slots** allow advanced use-cases

#### dynamic components

components can be **swapped dynamically** via the built-in `component` component

```
<component :is='activeComponent' ></component>
```

`activeComponent` is the name of the component

component caching can be added via the "keep-alive" component

#### pass props to dynamic components

1. you can pass prop directly

   ```
   <component :is='currentTab' :component1Prop1='component1Prop1'></component>
   ```

   but the flaw is you need to add v-bind for all props of ALL potential components

2. you can use v-bind without argument to pass an object that contain all props used by all potential components

   ```
   <component :is='currentTab' :='myPropObj'></component>
   ```

   ```
     computed: {
       dynamicComponentProp() {
         return {
           myPropObj: {
           	component1Prop1: this.component1Prop1,
           	component2Prop1: this.component2Prop1
           }
         }
       },
     }
   ```

3. use provide/inject feature in its ancestor

4. 

#### teleport and style guide

**DOM structure can be manipulated** via `teleport` - it **keeps the component hierarchy**

Consider follow the style guide
