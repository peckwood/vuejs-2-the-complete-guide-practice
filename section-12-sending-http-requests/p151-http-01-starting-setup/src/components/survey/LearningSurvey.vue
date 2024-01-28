<template>
  <section>
    <base-card>
      <h2>How was you learning experience?</h2>
      <form @submit.prevent="submitSurvey">
        <div class="form-control">
          <label for="name">Your Name</label>
          <input type="text" id="name" name="name" v-model.trim="enteredName" />
        </div>
        <h3>My learning experience was ...</h3>
        <div class="form-control">
          <input type="radio" id="rating-poor" value="poor" name="rating" v-model="chosenRating" />
          <label for="rating-poor">Poor</label>
        </div>
        <div class="form-control">
          <input
            type="radio"
            id="rating-average"
            value="average"
            name="rating"
            v-model="chosenRating"
          />
          <label for="rating-average">Average</label>
        </div>
        <div class="form-control">
          <input type="radio" id="rating-great" value="great" name="rating" v-model="chosenRating" />
          <label for="rating-great">Great</label>
        </div>
        <p
          v-if="invalidInput"
        >One or more input fields are invalid. Please check your provided data.</p>
        <p v-if='error'> {{ error }}</p>
        <div>
          <base-button>Submit</base-button>
        </div>
      </form>
    </base-card>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      enteredName: '',
      chosenRating: null,
      invalidInput: false,
      error: null
    };
  },
  // emits: ['survey-submit'],
  methods: {
    submitSurvey() {
      if (this.enteredName === '' || !this.chosenRating) {
        this.invalidInput = true;
        return;
      }
      this.invalidInput = false;

/*      this.$emit('survey-submit', {
        userName: this.enteredName,
        rating: this.chosenRating,
      });*/

      this.error = null;

      // correct url
      const url = 'http://localhost:8081/springbootapp/save-survey';

      // wrong url to trigger error
      // const url = 'http://localhost:8081/springbootapp/save-survey-404';

      const approach = 'fetch';
      // const approach = 'axios';

      if(approach === 'fetch') {
        // 我在url为404的时候, 不会等到then就报错了,
        // 也就是在fetch的时候就报错了,
        // 错误原因为`TypeError: Failed to fetch`
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
            /*
why does adding return before response.json() made outer catch able to catch the error thrown by inner catch?
ChatGPT
Adding return before response.json() in the promise chain has a significant impact on how errors are propagated. Let's break down what's happening:

Promise Chaining: In JavaScript, .then() and .catch() methods return a new promise, creating a chain of promises. When you return a value from a .then() callback, that value is wrapped in a new resolved promise if it's not already a promise. If you throw an error, it returns a rejected promise.

Without return: If you do not use return before response.json(), the result of response.json().then() (which is a promise) is not passed back to the main promise chain. Instead, it creates a separate, unconnected promise chain. In this case, if an error is thrown inside this separate chain, it doesn't propagate back to the outer .catch() block, because as far as the main chain is concerned, there was no error in its direct flow.

With return: When you use return before response.json(), you are linking the promise returned by response.json().then() back into the main promise chain. This means if an error is thrown inside this block, it returns a rejected promise, which is then passed down the main promise chain. The outer .catch() block is part of this main chain and catches any errors that propagate from any preceding .then() blocks.

In simpler terms, return response.json().then(...) ensures that the promise created by response.json() is integrated into the main fetch promise chain. So, if an error occurs in parsing JSON or if an error is thrown inside that .then() block, it affects the main chain and is caught by the outer .catch().

By using return, you're effectively saying, "Wait for this promise to resolve or reject, and let its outcome (success or failure) determine the flow of the main promise chain." That's why the outer .catch() can catch errors from the inner .then() block when return is used.
             */
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
          });
      }else if (approach === 'axios') {
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
      }else{
        console.log('you need to set "approach" to "axios" or "fetch"')
      }



      this.enteredName = '';
      this.chosenRating = null;
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

input[type='text'] {
  display: block;
  width: 20rem;
  margin-top: 0.5rem;
}
</style>