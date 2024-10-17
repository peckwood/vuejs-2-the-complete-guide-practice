import {createStore} from 'vuex';
import cartModule from '@/store/modules/carts';
import productModule from '@/store/modules/products';
import authModule from '@/store/modules/auth';

const store = createStore({
  state(){
    return {}
  },
  modules: {
    cart: cartModule,
    product: productModule,
    auth: authModule
  },
});

export default store;
