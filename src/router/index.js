import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Users from '../components/Users/Users.vue'
import Rights from '../components/Power/Rights.vue'
import Roles from '../components/Power/Roles.vue'
import Welcome from '../components/HomeChildComponents/Welcome.vue'
import Cate from '../components/Goods/Cate.vue'
import Params from '../components/Goods/Params.vue'
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
     },
     {
       path:"/rights",
       component:Rights
     },
     {
      path:"/roles",
      component:Roles
    },
    {
      path:'/categories',
      component:Cate
    },
    {
      path:'/params',
      component:Params
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
