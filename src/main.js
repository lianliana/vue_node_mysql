import Vue from 'vue'
import App from './App.vue'
import {
  Button, FormItem, Form, Input,
  Message, Container, Header, Aside,
  Main, Row, Col, Menu, Submenu, MenuItem,
  MenuItemGroup, Breadcrumb, BreadcrumbItem,
  Card, Table, TableColumn, Switch,
  Tooltip, Pagination, Dialog,MessageBox,
  Tag,Tree,Cascader,Alert,Tabs,TabPane
} from 'element-ui';
import ZkTable from 'vue-table-with-tree-grid'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import '../src/assets/css/global.css'
Vue.use(Button);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Input);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Main)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(ZkTable)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.component(Message.name, Message)
Vue.component(MessageBox.name, MessageBox)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
