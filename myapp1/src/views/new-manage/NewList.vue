<template>
    <div>
        <el-page-header :icon="null" title="新闻管理">
            <template #content>
                <span class="text-large font-600 mr-3">新闻列表</span>
            </template>
        </el-page-header>

        <el-card class="card">
            <el-table :data="tableData">
                <el-table-column prop="title" label="title" />

                <el-table-column label="角色">
                    <template #default="scope">
                        <span v-if="scope.row.category === 1">最新案例</span>
                        <span v-if="scope.row.category === 2">典型案例</span>
                        <span v-if="scope.row.category === 3">通知公告</span>
                    </template>
                </el-table-column>

                <el-table-column prop="editTime" label="更新时间">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>

                <el-table-column label="是否发布">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" :active-value='1' :inactive-value='0'
                            @change="handleChange(scope.row)" />
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button circle icon="Delete" type="danger" @click="handleDle(scope.row)" />
                        <el-button circle icon="View" @click="handleView(scope.row)" />
                        <el-button circle icon="Edit" type="success" @click="handleEdit(scope.row)" />
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-model="dialogVisible" title="预览新闻" width="500">
            <div>
                <h2>{{ ViewData.title }}</h2>
                <span>{{ formatTime.getTime(ViewData.editTime) }}</span>
                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>
                <div v-html="ViewData.content" class="Viewhtml">
            
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script setup>
import router from '@/router';
import formatTime from '@/util/formatTime';
import axios from 'axios';
import { onMounted, ref } from 'vue'
const tableData = ref([])
const ViewData = ref()
const dialogVisible = ref(false)
onMounted(() => {
    GetNewdata()
})
const GetNewdata = async () => {
    const res = await axios.get('http://localhost:3000/api/news/newList')
    // console.log(res.data.data)
    tableData.value = res.data.data
}
const handleChange = async (value) => {
    // console.log(value)
    await axios.put(`http://localhost:3000/api/news/newList`, {
        id: value.id,
        isPublish: value.isPublish
    })
}
const handleView = (value) => {
    ViewData.value = value
    dialogVisible.value = true
    // console.log(ViewData.value.id)

}
const handleDle=async(value)=>{
    await axios.delete(`http://localhost:3000/api/news/newList/${value.id}`)
    GetNewdata()
}
const handleEdit=(value)=>{
    router.push(`/newList/edit/${value.id}`)
}

</script>
<style scoped>
.card {
    margin-top: 30px;
}
::v-deep .Viewhtml img{
    width: 100%;
}
</style>