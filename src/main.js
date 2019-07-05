import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Login from './components/Login'
import Admin from './components/Admin'
import User from './components/User'

Vue.use(Router)

const router = new Router({
    routes: [
        // {
        //     path: '/',
        //     redirect: {
        //         name: 'login'
        //     }
        // },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin
        },
        {
            path: '/user',
            name: 'user',
            component: User
        }
    ]
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
