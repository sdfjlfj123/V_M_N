<template>
    <div>
        <el-carousel height="100vh" direction="vertical" motion-blur arrow="hover" v-if="looplist.length">
            <el-carousel-item v-for="(item, index) in looplist" :key="index">
                <div :style="{
                    backgroundImage: `url(http://localhost:3000${item.cover})`,
                    width: '100%',
                    height: '100%',
                }" class="image">
                    <el-card class="card">
                        <h3 style="font-size: 30px;">{{ item.title }}</h3>
                        <span style="margin: 15px;">{{ item.introduction }}</span>
                        <P>{{ item.detail }}</P>
                    </el-card>
                </div>
            </el-carousel-item>
        </el-carousel>
        <el-empty v-else description="暂无产品" />
    </div>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue'
const looplist = ref([])
onMounted(async () => {
    const res = await axios.get("http://localhost:3000/web/product/list")
    // console.log(res.data.data)
    looplist.value = res.data.data
})

</script>
<style scoped>
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

.image {
    background-size: cover;
}

.card {
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5)
}
</style>