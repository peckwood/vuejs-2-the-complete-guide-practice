
const cartModule = {
  namespaced: true,
  state(){
    return {
      cart: {
        items: [],
        total: 0,
        qty: 0,
      }
    };
  },
  mutations: {
    addProductToCart(state, payload){
      const allProducts = payload.allProducts;
      const productId = payload.productId;

      const productData = allProducts.findIndex(
        (ci) => ci.productId === productId
      );

      const productInCartIndex = state.cart.items.findIndex(
        (ci) => ci.productId === productId
      );

      if (productInCartIndex >= 0) {
        state.cart.items[productInCartIndex].qty++;
      } else {
        const newItem = {
          productId: productData.id,
          title: productData.title,
          image: productData.image,
          price: productData.price,
          qty: 1,
        };
        state.cart.items.push(newItem);
      }
      state.cart.qty++;
      state.cart.total += productData.price;
    },
    removeProductFromCart(state, payload) {
      const prodId = payload.prodId;
      const productInCartIndex = state.cart.items.findIndex(
        (cartItem) => cartItem.productId === prodId
      );
      const prodData = state.cart.items[productInCartIndex];
      state.cart.items.splice(productInCartIndex, 1);
      state.cart.qty -= prodData.qty;
      state.cart.total -= prodData.price * prodData.qty;
    },
  },
  actions: {
    addProductToCart(context, payload){
      // the following won't work, context is local context, its getters only have cart getters
      // const allProducts = context.getters['product/products2']

      // use rootState
      const allProducts = context.rootState.product.products;
      payload.allProducts = allProducts;
      context.commit('addProductToCart', payload);
    },
    removeProductFromCart(context, payload){
      context.commit('removeProductFromCart', payload);
    }
  },
  getters: {
    cart(state) {
      return state.cart;
    },
    cartTotalAmount(state){
      return state.cart.total.toFixed(2)
    }
  }

};
export default cartModule;