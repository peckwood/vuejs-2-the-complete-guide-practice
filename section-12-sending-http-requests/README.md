# Section 12: Sending Http Requests

### 153 How to (Not) send Http Requests

we usually dont sent http request using `<button type='submit'>` inside `<forms>` anymore

Instead, to send http requests, we can use third party packages like **axios**

another option is **fetch**, which is built-in method, which can send data to server, or get data from server

Both can send async requests

### 154 Sending a POST request to store data

#### Enable CORS in Spring

Since we are accessing localhost:8081 from localhost:8080, which will cause CORS, we need to enable CORS.

In Spring, we can allow access from any source using

```java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }
}
```

> [CORS with Spring | Baeldung](https://www.baeldung.com/spring-cors)

#### Use Spring JPA to save Data

> [Spring Data - CrudRepository save() Method | Baeldung](https://www.baeldung.com/spring-data-crud-repository-save)

Entity:

```java
@Data
@Entity
public class Survey {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String rating;
}
```

Repository:

```java
@Repository
public interface ISurveyDAO extends JpaRepository<Survey, String> {
}
```

Controller:

```java
    @PostMapping("save-survey")
    public Map<String, Object> saveSurvey(@RequestBody Survey survey){
        iSurveyDAO.save(survey);
        Map<String, Object> result = new HashMap<>();
        result.put("code", 0);
        return result;
    }
```

#### Use fetch to send data from frontend

```javascript
      fetch('http://localhost:8081/springbootapp/save-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.enteredName,
          rating: this.chosenRating
        })
      });
```

### 156 Using Axios Instead Of "fetch()"

Run `npm install --save axios` to install axios

Import

```
<script>
import axios from 'axios';
export default {
...
```

Send Data with Axios

```
      axios.post('http://localhost:8081/springbootapp/save-survey', {
        name: this.enteredName,
        rating: this.chosenRating,
      });
```

As you can see, with Axios, you have to **write less code**. It automatically sets the `Content-Type` header for you, it also automatically converts the body data to JSON.

### 157  Getting Data (GET Request) & Transforming Response Data

#### chain then()

```
fetch(url).then(response => {
if (response.ok) {
	return response.json();
}
}).then(data => {
	this.results = data;
});
```

is better than

```
fetch(url).then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.results = data;
          })
        }
      });
```

#### get data with fetch() and axios

```
    loadData() {
      const url = 'http://localhost:8081/springbootapp/get-all-survey';

      fetch(url).then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(data => {
        this.results = data;
      });

      axios.get(url).then(res => {
        this.results = res.data;
      });
    }

```

### Difference between regular function syntax and  arrow function syntax

if you write

```
      fetch(url).then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(function(data){
        this.results = data;
      });
```

you get error

```
Uncaught (in promise)
TypeError: Cannot set property 'results' of undefined at eval...
```

The `this` inside function() does not refer to my vue instance object. `this` keyword inside of arrow function refer to the same context as it does outside of them.

### 163 Handling Error Responses

#### fetch

why does adding return before response.json() made outer catch able to catch the error thrown by inner catch?
ChatGPT
Adding return before response.json() in the promise chain has a significant impact on how errors are propagated. Let's break down what's happening:

Promise Chaining: In JavaScript, .then() and .catch() methods return a new promise, creating a chain of promises. When you return a value from a .then() callback, that value is wrapped in a new resolved promise if it's not already a promise. If you throw an error, it returns a rejected promise.

Without return: If you do not use return before response.json(), the result of response.json().then() (which is a promise) is not passed back to the main promise chain. Instead, it creates a separate, unconnected promise chain. In this case, if an error is thrown inside this separate chain, it doesn't propagate back to the outer .catch() block, because as far as the main chain is concerned, there was no error in its direct flow.

With return: When you use return before response.json(), you are linking the promise returned by response.json().then() back into the main promise chain. This means if an error is thrown inside this block, it returns a rejected promise, which is then passed down the main promise chain. The outer .catch() block is part of this main chain and catches any errors that propagate from any preceding .then() blocks.

In simpler terms, return response.json().then(...) ensures that the promise created by response.json() is integrated into the main fetch promise chain. So, if an error occurs in parsing JSON or if an error is thrown inside that .then() block, it affects the main chain and is caught by the outer .catch().

By using return, you're effectively saying, "Wait for this promise to resolve or reject, and let its outcome (success or failure) determine the flow of the main promise chain." That's why the outer .catch() can catch errors from the inner .then() block when return is used.

```
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.enteredName,
            rating: this.chosenRating
          })
        }).then(response => {
          if (response.ok) {
            //...
          } else {
            // return 很关键, 可以让外面的catch捕获里面的error
            return response.json().then(json => {
              const msg = 'Custom error handling: could not save data' +
                ', error code: ' + response.status + ', error: ' + json.error;
              throw new Error(msg);
            }).catch(e => {
              console.log('catch1:');
              throw e;
            });
          }
        })
          .catch(err => {
            console.log('catch2:');
            this.error = err.message;
          })
```

#### axios

With axios, the catch will also trigger on error responses.

```
        axios.post(url, {
          name: this.enteredName,
          rating: this.chosenRating
          /*
          When you make an HTTP request with axios,
          the library returns a promise.
          If the request is successful (i.e. the server responds with a 2xx status code),
          the promise will be resolved and the then() callback will be
          called with the response data. On the other hand,
          if the request fails (i.e. the server responds with a 4xx or 5xx status code),
          the promise will be rejected and the catch() callback will be called with the error.
           */
        }).then(response => {
          // success
        })
          .catch(err => {
            //handle error
            console.log(err);
            this.error = err.message;
          });
```



### 164 module summary

You learnt

- how to send http requests to send and get data
- how to work with reponse data, how to extract, how to show it
- how to show loading message
- how to handle errors
