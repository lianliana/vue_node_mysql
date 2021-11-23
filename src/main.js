import Vue from 'vue'
import App from './App.vue'
import {Button,FormItem,Form,Input,Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import '../src/assets/css/global.css'
Vue.use(Button);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Input);
Vue.component(Message.name, Message)
Vue.prototype.$message=Message
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
