import {createStore} from "vuex";

import coachesModule from './modules/coaches/index'
const store = createStore({
    modules: {
        coaches: coachesModule
    },
    state(){
        return {
            userId: 'c3'
        }
    },
    getters: {
        userId(state){
            return state.userId;
        },
        hasCoaches(state){
            return state.coaches && state.coaches.length > 0;
        }
    }
})

export default store