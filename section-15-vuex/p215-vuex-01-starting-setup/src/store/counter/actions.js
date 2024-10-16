export default {
  increment(context){
    setTimeout(function(){
      context.commit('increment');
    }, 2000);
  },
  increase(context, payload){
    console.log('action context', context);
    setTimeout(function(){
      context.commit('increase', payload);
    }, 2000);
  },
};