import { createRouter, createWebHistory } from "vue-router";
import Home from '../view/Home.vue'
import New from '../view/New.vue'
import Product from '../view/Product.vue'
import NotFound from '../view/NotFound.vue'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import Newdetail from "../view/Newdetail.vue";
const routes=[
    {
        path:'/',
        name:'home',
        component:Home
    },
    {
        path:'/New',
        name:'new',
        component:New
    },
    {
        path:'/Product',
        name:'product',
        component:Product
    },
    {
        path:'/:pathMatch(.*)*',
        component:NotFound
    },
    {
        path:'/newdetail/:id',
        name:"Newdetail",
        component:Newdetail
    }
]
const router=createRouter({
    history:createWebHistory(),
    routes
})
router.beforeEach((to,from,next)=>{
    Nprogress.start();
    next()
})
router.afterEach((to,from,next)=>{
    Nprogress.done();
    
})
export default router