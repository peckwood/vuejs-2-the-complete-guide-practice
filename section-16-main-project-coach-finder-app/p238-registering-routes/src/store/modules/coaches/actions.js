export default {
    updateCoaches(context, coaches){
        context.commit('mutateCoaches', coaches)
    }
}