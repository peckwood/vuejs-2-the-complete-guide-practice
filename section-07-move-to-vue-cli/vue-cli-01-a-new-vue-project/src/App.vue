<template>
  <section>
  <h2>My Friends</h2>
  <ul>
    <li></li>
  </ul>
  </section>
</template>

<script>
export default {
  data(){
    return {
      friends: [
        {
          id: 'manual',
          name: 'Manuel Lorenz',
          phone: '0123 45678 90',
          email: 'manuel@localhost.com'
        },
        {
          id: 'julie',
          name: 'Julie Jones',
          phone: '0123 45678 88',
          email: 'julie@localhost.com'
        }
      ]
    };
  },
};
</script>