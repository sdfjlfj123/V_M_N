<template>
    <div class="Navbar">
        <el-menu :default-active="route.fullPath" class="el-menu-demo" mode="horizontal" :router="true">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/new">新闻中心</el-menu-item>
            <el-menu-item index="/product">产品与服务</el-menu-item>
            <el-menu-item index="" @click="hanleClick">登录</el-menu-item>
        </el-menu>
        <div class="right">企业门户官网</div>
    </div>
</template>
<script setup>
import {useRoute} from 'vue-router'
const route=useRoute()
const hanleClick=()=>{
    window.location="http://localhost:5173/login"
}
</script>
<style scoped>
.Navbar{
    position: sticky;
    top: 0px;
    z-index: 100;
}
.right{
    position: fixed;
    top:0px;
    right: 20px;
    widows: 100px;
    height: 60px;
    line-height: 60px;
    text-align: center;
}
</style>