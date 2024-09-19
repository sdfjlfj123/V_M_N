<template>
    <div class="container">
        <div class="news-haeder" :style="{
            backgroundImage: 'url(https://b.53326.com/dydao/d/20200101/k5clqifi5j0.jpg)'
        }">
        </div>

        <div class="search">
            <el-popover placement="bottom" title="检索结果" width="50%" :visible="visible">
                <template #reference>
                    <el-input v-model="SearchText" placeholder="请输入关键字" type="search" @input="visible = true"
                        @blur="visible = false" :prefix-icon="Search" />
                </template>
                <div class="searchItem" v-if="searchList.length">
                    <div v-for="item in searchList" :key="item.id" @click="handleFrom(item.id)">
                        {{ item.title }}
                    </div>
                </div>
                <div v-else>
                    <el-empty description="暂无新闻" :image-size="50" />
                </div>
            </el-popover>
        </div>
        <div class="topNew">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in topNewList" :key="item.id">
                    <el-card style="max-width: 480px" shadow="hover" @click="handleFrom(item.id)" >
                        <div class="image" :style="{
                            backgroundImage: `url(http://localhost:3000${item.cover})`
                        }" />
                        <div style="padding: 14px;">
                            <span>{{ item.title }}</span>
                            <div class="bottom">
                                <time class="time">{{ formatTime.getTime(item.editTime) }}</time>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <el-tabs v-model="activeName" type="card" class="demo-tabs">
            <el-tab-pane v-for="data in tablist" :key="data.name" :label=data.label :name=data.name>
                <div v-for="item in tabnews[data.name]" :key="item.id" style="padding: 10px;">
                    <el-row :gutter="20">
                        <el-col :span="18">
                            <el-card style="width: 100%;" shadow="hover">
                                <div class="tab-image" :style="{
                                    backgroundImage: `url(http://localhost:3000${item.cover})`
                                }" />
                                <div style="padding: 14px; float:left;">
                                    <span>{{ item.title }}</span>
                                    <div class="bottom">
                                        <time class="time">{{ formatTime.getTime(item.editTime) }}</time>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>

                        <el-col :span="6">
                            <el-timeline>
                                <el-timeline-item v-for="item in tabnews[data.name]" :key="item.id"
                                    :timestamp="formatTime.getTime(item.editTime)">
                                    {{ item.title }}
                                </el-timeline-item>
                            </el-timeline>
                        </el-col>
                    </el-row>
                </div>
            </el-tab-pane>
            <el-backtop :right="100" :bottom="100" />
        </el-tabs>
    </div>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import formatTime from '../../util/formatTime';
import _ from 'lodash'
import router from '../router';
const SearchText = ref("")
const newlist = ref([])
const visible = ref(false)
const activeName = ref(1)
const tablist = [
    {
        label: "最新动态",
        name: 1
    }, {
        label: "典型案例",
        name: 2
    }, {
        label: "通知公告",
        name: 3
    }
]
const tabnews = computed(() => {
    return _.groupBy(newlist.value, item => item.category)
})
onMounted(async () => {
    const res = await axios.get("http://localhost:3000/web/new/list")
    newlist.value = res.data.data
    // console.log(_.groupBy(newlist.value,item=>item.category))
})
const searchList = computed(() => {
    return SearchText.value ? newlist.value.filter(item => item.title.includes(SearchText.value)) : []
})
const topNewList = computed(() => {
    return newlist.value.slice(0, 4)
})
const handleFrom=(id)=>{
    router.push(`/newdetail/${id}`)
    // console.log(id)
}
</script>
<style scoped>
.container {
    position: relative;
}

.news-haeder {
    width: 100%;
    height: 400px;
    background-size: cover;
}

.search {
    width: 100%;
    position: absolute;
    top: 300px;
    text-align: center;
}

.el-input {
    width: 50%;
}

.searchItem {
    height: 30px;
    line-height: 30px;
}

.searchItem :hover {
    background: rgb(209, 193, 193);
    color: red;
}

.topNew {
    margin: 20px;
}

.image {
    width: 100%;
    height: 150px;
    background-size: cover;
}

.time {
    font-size: 13px;
    color: gray;
}

.tab-image {
    width: 150px;
    height: 200px;
    background-size: cover;
    float: left;
}
</style>