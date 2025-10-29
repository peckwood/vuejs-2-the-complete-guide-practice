# Section 16 Main Project "Find a Coach" Web app

### 235 Planning the project / Web App

![image-20241019111937735](README.assets/image-20241019111937735.png)

### 236 planning the Data Requirements

#### domain

- coach
  - id
  - first name
  - last name
  - description
  - rate
- request
  - coach id
  - message
  - email

#### mutation

- register
- set coaches
- contact coach
- set requests

### action

- loading coaches from database
- loading requests from database
- add coach
- add request

### 237 Planning the Layout / Components

#### routes

- `/coaches` -> CoachList
- /coaches/:id -> CoachDetails
- /register -> CoachRegistration
- /contact -> ContactCoach
- /request -> RequestReceived
- 

### data

![IMG20251014232020 (1)](./README.assets/IMG20251014232020 (1).jpg)

![IMG20251014231451 (1)](./README.assets/IMG20251014231451 (1).jpg)

#### pages

![image-20241023225946940](README.assets/image-20241023225946940.png)

## 238 registering routes

1. I downloaded the startup resources accompanied by course 238

2. install vuex and vue-router

   ```
   npm install --save vue-router@next vuex@next
   ```

3. created router.js and added routes

### 239 Adding Route Page Components

1. I created empty vue pages for each component
2. linked them to different routes inside router.js
3. created App.vue
4. edited main.js so that App.vue is loaded and it uses router

### 240 Working on the Main Layout & Styling

1. I created `TheHeader` component, which includes multiple `router-link` to navigate to different pages
2. imported TheHeader into App.vue, so that it is global

### 241 Wiring Up Pages

something to note about child routes:

1. it will not be loaded to replace the parent route
2. it needs a new <router-view> inside the parent component
3. 

