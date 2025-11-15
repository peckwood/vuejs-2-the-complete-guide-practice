export default {
    coaches(state){
        return state.coaches;
    },
    hasCoaches(state){
        return state.coaches && state.coaches.length > 0;
    },
    isCoach(_, getters, _2, rootGetters){
        let isCoach = false;
        isCoach = getters.coaches.some(coach => {
            return coach.id === rootGetters.userId;
        });
        return isCoach
    }
}