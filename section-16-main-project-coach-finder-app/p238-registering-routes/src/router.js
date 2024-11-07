import {createRouter, createWebHistory} from "vue-router";

import CoachDetail from "@/pages/coaches/CoachDetail.vue";
import CoachesList from "@/pages/coaches/CoachesList.vue";
import CoachRegistration from "@/pages/coaches/CoachRegistration.vue";
import ContactCoach from "@/pages/requests/ContactCoach.vue";
import RequestsReceived from "@/pages/requests/RequestsReceived.vue";
import notFound from "@/pages/NotFound.vue";
import coachDetail from "@/pages/coaches/CoachDetail.vue";
import contactCoach from "@/pages/requests/ContactCoach.vue";
import coachRegistration from "@/pages/coaches/CoachRegistration.vue";
import requestsReceived from "@/pages/requests/RequestsReceived.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/coaches'},
        {path: '/coaches', component: CoachesList},
        {
            path: '/coaches/:id', component: coachDetail, children: [
                {path: 'contact', component: contactCoach},// /coaches/c1/contact
            ]
        },
        {path: '/register', component: coachRegistration},
        {path: '/requests', component: requestsReceived},
        {path: '/:notFound(.*)', component: notFound},

    ]
})

export default router;