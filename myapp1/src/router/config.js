
import Home from '@/views/home/home.vue'
import Center from '@/views/center/center.vue'
import NewAdd from '@/views/new-manage/NewAdd.vue'
import NewList from '@/views/new-manage/NewList.vue'
import Notfound from '@/views/notfound/notfound.vue'
import ProductAdd from '@/views/product-manage/ProductAdd.vue'
import ProductList from '@/views/product-manage/ProductList.vue'
import UserAdd from '@/views/user-manage/UserAdd.vue'
import UserList from '@/views/user-manage/UserList.vue'
import Edit from '@/views/new-manage/Edit.vue'
const routers = [{
  path: '/',
  redirect: "/home"
},
{
  path: '/home',
  component: Home
}, {
  path: "/center",
  component: Center
}, {
  path: '/new',
  children: [{
    path: 'newAdd',
    component: NewAdd
  }, {
    path: 'newList',
    component: NewList,
  },]
}, {
  path: '/newList/edit/:id',
  component: Edit
}
, {
  path: '/:pathMatch(.*)*',
  component: Notfound
}, {
  path: '/product',
  children: [
    {
      path: 'productAdd',
      component: ProductAdd
    }, {
      path: 'productList',
      component: ProductList
    }
  ]
},
{
  path: '/user',
  requireAdmin: true,
  children: [
    {
      path: 'userAdd',
      component: UserAdd
    },
    {
      path: 'userList',
      component: UserList
    }
  ]
}]


export default routers
