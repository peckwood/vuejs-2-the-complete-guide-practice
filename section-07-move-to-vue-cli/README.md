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

### 86 adding a component

#### components are usually in src/components folder

#### name your component PascalCase, it is most common

#### how to add component

or register component or declare component

approach 1: inside component:

注意是**大括号**

```
<script>
import FriendContact from "@/components/FriendContact.vue";
export default {
  components: {FriendContact},
  data(){
  // ...
```

approach 2: inside js:

```
import { createApp } from 'vue';
// 注意这里不要大括号, 大括号是为了named export
import App from "./App.vue";
import FriendContact from "@/components/FriendContact.vue";

const app = createApp(App)

app.component('FriendContact', FriendContact);
app.mount('#app');
```

### 87 add styling

