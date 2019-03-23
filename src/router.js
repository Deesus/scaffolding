import Vue from 'vue';
import Router from 'vue-router';



Vue.use (Router);

export default new Router({
    base: process.env.BASE_URL,
    routes: [
        // home route:
        {
            path: '/',
            name: 'home'
        },

        // default route:
        {
            path: '*',
            redirect: { name: 'home' }
        }
    ]
});
