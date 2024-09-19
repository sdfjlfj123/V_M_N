<template>
    <div class="content">
        <el-row>
            <el-col :span="17" :offset="1">
                <div>
                    <h3>{{ currentNew.title }}</h3>
                    <span style="font-size: 13px; color: gray;">{{ formatTime.getTime(currentNew.editTime) }}</span>
                    <el-divider />
                    <div v-html="currentNew.content"></div>
                </div>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-card style="max-width: 480px">
                    <template #header>
                        <div class="card-header">
                            <span>最近新闻</span>
                        </div>
                    </template>
                    <div v-for="(item, index ) in toplist" :key="index" class="text item" style="margin-top: 20px;" @click="handleFrom(item.id)">
                        <span>{{ item.title }}</span>
                        <div>
                            <time class="time">{{ formatTime.getTime(item.editTime) }}</time>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>

import axios from 'axios';
import { ref, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import formatTime from '../../util/formatTime';
import router from '../router';
const currentNew = ref({})
const toplist = ref([])
const route = useRoute()
watchEffect(async () => {
    const res1 = await axios.get(`http://localhost:3000/web/new/list/${route.params.id}`)
    const res2 = await axios.get(`http://localhost:3000/web/new/toplist?limit=4`)
    // console.log(res.data.data[0])
    currentNew.value = res1.data.data[0]
    // console.log(res2.data.data[0])
    toplist.value = res2.data.data
})
const handleFrom=(id)=>{
    router.push(`/newdetail/${id}`)
    // console.log(id)
}
</script>
<style scoped>
.content {
    margin-top: 30px;
}
.time {
    font-size: 13px;
    color: gray;
}
</style>