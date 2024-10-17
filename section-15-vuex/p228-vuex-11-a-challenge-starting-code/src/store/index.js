import {createStore} from 'vuex';
import cartModule from '@/store/modules/carts';
import productModule from '@/store/modules/products';

const store = createStore({
  state(){
    return {}
  },
  modules: {
    cart: cartModule,
    product: productModule
  },
});

export default store;
