<template>
  <h2>{{friend.name}} {{ isFavorite ? '(Fav)' : ''}}</h2>
  <button @click="toggleFavorite">Toggle Favorite</button>
  <br />
  <button @click="toggleDetails">{{detailsAreVisible ? 'Hide' : 'Show'}} Details</button>
  <ul v-if="detailsAreVisible">
    <li><strong>Phone:</strong> {{friend.phone}}</li>
    <li><strong>Email:</strong> {{friend.email}}</li>
  </ul>
  <button @click="deleteFriend">Delete</button>
</template>

<script>
export default {
  props: {
    friend: {
      required: false,
      type: Object
    },
    isFavorite: {
      type: Boolean
    },
  },
  emits: {
    'toggle-favorite': function(newVal){
      if(newVal) {
        return true;
      }else{
        console.warn('newVal is missing');
        return false;
      }
    },
    'delete-friend': null
  },
  data() {
    return {
      detailsAreVisible: true,
      isFavoriteLocal: this.isFavorite
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
    toggleFavorite() {
      // the following code will show error: Unexpected mutation of "isFavorite" prop
      // this.isFavorite = !this.isFavorite;

      // You can change a local copy of prop
      // this.isFavoriteLocal = !this.isFavoriteLocal;

      // You can pass changes to parent though emitting events
      this.$emit('toggle-favorite', !this.isFavorite);
    },
    deleteFriend() {
      this.$emit('delete-friend', this.friend.id);
    }
  }
};

</script>