
const cartModule = {
  state(){
    return {
      items: [],
      total: 0,
      qty: 0
    };
  },
  mutations: {
    addProductToCart(state, payload){
      const productData = payload.value;
      const productInCartIndex = state.items.findIndex(
        (ci) => ci.productId === productData.id
      );

      if (productInCartIndex >= 0) {
        state.items[productInCartIndex].qty++;
      } else {
        const newItem = {
          productId: productData.id,
          title: productData.title,
          image: productData.image,
          price: productData.price,
          qty: 1,
        };
        state.items.push(newItem);
      }
      state.qty++;
      state.total += productData.price;
    }
  },
  actions: {
    addProductToCart(context, payload){
      context.commit('addProductToCart', payload);
    }
  }

};
export default cartModule;