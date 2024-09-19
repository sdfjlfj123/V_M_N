
import Login from "@/views/Login.vue";
import MainBox from "@/views/MainBox.vue";
import routersConfig from './config'
import { createRouter, createWebHistory } from "vue-router";
import useRouterConfig from "@/stores/index";
import userStore from "@/stores/user";
const routes = [
  {
    path: "/login",
    name: "login",
    component: Login

  },
  {
    path: "/",
    name: "mainbox",
    component: MainBox
  },
  //mainbox的嵌套路由动态添加
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
// router.addRoute('mainbox',{
//   path:'/home',
//   component:Home
// })

router.beforeEach((to, from, next) => {
  // 获取 store 实例
  const store = useRouterConfig();

  if (to.name === 'login') {
    // 如果目标是登录页，直接放行
    next();
  } else {
    // 未授权
    if (!localStorage.getItem("token")) {
      next({ name: 'login' });
    } else {
      // 授权
      if (!store.isGetterRouter) {
        // 第一次请求前加载路由
        ConfigRouter()
        store.changeIsGetterRouter(true); // 更新状态以避免重复加载
        next(to.fullPath); // 使用 to.fullPath 进行导航
      }
      else {
        // 第二次请求放行
        next();
      }
    }
  }
})
const ConfigRouter = () => {
  const store = useRouterConfig();
  // 检查是否已经添加过路由
  if (!store.isGetterRouter) {
    routersConfig.forEach(item => {
      checkPerminssion(item) && router.addRoute('mainbox', item);
    });

  }
}
const checkPerminssion = (item) => {
  const userstore = userStore()
  if (item.requireAdmin) {
    return userstore.userdata.role === 1
  }
  return true
}


export default router