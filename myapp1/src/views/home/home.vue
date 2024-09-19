<template>
    <div>
        <el-page-header :icon="null" title="新闻管理系统">
            <template #content>
                <span class="text-large font-600 mr-3"> 首页 </span>
            </template>
        </el-page-header>

        <el-card class="card">
            <el-row>
                <el-col :span="6">

                    <el-avatar :size="50" :src="avatarUrl" />
                </el-col>
                <el-col :span="18">
                    <h3 style="line-height: 50px;">欢迎{{ store.userdata.username }}回来</h3>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="card">
            <template #header>
                <div class="card-header">
                    <span>product</span>
                </div>
            </template>

            <el-carousel v-if="loopList.length"
            :interval="4000" type="card" height="300px">
                <el-carousel-item v-for="item in loopList" :key="item.id">
                    <div :style="{
                        backgroundImage:`url(http://localhost:3000${item.cover})`,
                        backgroundSize:'contain',
                        height:'330px'
                    }">
                        <h3>{{ item.title }}</h3>
                    </div>
                </el-carousel-item>
            </el-carousel>

        </el-card>
    </div>
</template>
<script setup>
import userStore from '@/stores/user';
import axios from 'axios';
import {ref, computed, onMounted } from 'vue';
const store = userStore()
const loopList=ref([])
// console.log(store.userdata)
const avatarUrl = computed(
    () => {
        return store.userdata.avatar ? 'http://localhost:3000' + store.userdata.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
)
onMounted(()=>{
    GetProductdata()
})
const GetProductdata=async()=>{
    const res=await axios.get("http://localhost:3000/api/product/productList")
    loopList.value=res.data.data
    // console.log(loopList)
}
</script>
<style scoped>
.card {
    margin-top: 50px;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>