import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Users from '../components/Users/Users.vue'
import Welcome from '../components/HomeChildComponents/Welcome.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/login"
  }
  ,{
    path:"/login",
    component:Login
  },
  {
    path:"/home",
    component:Home,
    redirect:'/Welcome',
    children:[
     {
      path:"/Users",
      component:Users
     },
     {
       path:"/Welcome",
       component:Welcome
     }

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.path=='/login') next();
  else {
    const token=window.sessionStorage.getItem('token')
    if(token){
      next()
    }
    else{
      next('/login')
    }
  }
})

export default router
