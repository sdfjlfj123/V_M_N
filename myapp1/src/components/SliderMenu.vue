<template>
    <el-aside width="150px">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
            <el-radio-button :value="false">expand</el-radio-button>
            <el-radio-button :value="true">collapse</el-radio-button>
        </el-radio-group>
        <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" :router="true">
            <el-menu-item index="/">
                <el-icon><HomeFilled /></el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/center">
                <el-icon><UserFilled /></el-icon>
                <span>个人中心</span>
            </el-menu-item>
            <el-sub-menu index="/user/userList" v-admin>
                <template #title>
                    <el-icon><User /></el-icon>
                    <span>用户</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/user/userList">用户列表</el-menu-item>
                    <el-menu-item index="/user/userAdd">添加用户</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="/new/newList">
                <template #title>
                    <el-icon><Grid /></el-icon>
                    <span>新闻</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/new/newList">新闻列表</el-menu-item>
                    <el-menu-item index="/new/newAdd">添加新闻</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="/product/productList">
                <template #title>
                    <el-icon><Histogram /></el-icon>
                    <span>产品</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/product/productList">产品列表</el-menu-item>
                    <el-menu-item index="/product/productAdd">添加产品</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>
<script setup>
import { ref } from 'vue'
import userStore from '@/stores/user';
const store=userStore()
// console.log(store.userdata)
const vAdmin={
    mounted(el){
        // console.log(el)
        if(store.userdata.role!==1){
            el.parentNode.removeChild(el)
        }
    }
}
const isCollapse = ref(true)
// const handleOpen = (key, keyPath) => {
//   console.log(key, keyPath)
// }
// const handleClose = (key, keyPath) => {
//   console.log(key, keyPath)
// }

</script>
<style scoped>
.el-aside {
    height: 100vh;
}
</style>