export default {
    registerCoach(context, data){
        context.commit('registerCoach', {
            id: context.rootGetters.userId,
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        })
    }
}