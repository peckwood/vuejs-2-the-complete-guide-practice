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

