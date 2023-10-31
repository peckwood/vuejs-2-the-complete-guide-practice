### 79 installing and useing Vue CLI

#### install command

```
npm install -g @vue/cli
```

#### check version

```
vue --version
```

### run dev server

```
npm run serve
```

### create app

```
vue create vue-first-app
```



You should keep it running when you are testing the app

### install dependencies

```
npm install
```

npm will check the dependencies in package.json and download the dependencies into the node_modules folder. Then they are available.

You don't need to do it right after creating a app, as vue-cli did it for us at `vue create`.

do `npm install` when a project is shared to you (without node_modules)

### 85 creating a basic vue app

We leave index.html alone instead, we add template code inside <template>

create a default export of App.vue:

```
export default {
  data(){
  // ...
}
```



To import from package, you just reference the package name:

```
import { createApp } from 'vue';
```

If you import from a custom file, like App.vue, you specify the path to that file:

```
import App from "./App.vue";
```

To import a named export, you use curly braces:

```
import { createApp } from 'vue';
```

To import a default export:

```
import App from "./App.vue";
```