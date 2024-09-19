<template>
    <div>
        <el-page-header :icon="null" title="产品管理">
            <template #content>
                <span class="text-large font-600 mr-3">产品列表</span>
            </template>
        </el-page-header>


        <el-card class="card">
            <el-table :data="tableData">
                <el-table-column prop="title" label="产品名称" />

                <el-table-column prop="introduction" label="产品简要描述" />

                <el-table-column prop="editTime" label="更新时间">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button circle icon="Delete" type="danger" @click="handleDle(scope.row)" />
                        <el-button circle icon="Edit" type="success" @click="handleEdit(scope.row)" />
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-model="dialogVisible" title="编辑产品" width="500">
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
                class="demo-ruleForm" status-icon>
                <el-form-item label="产品名称" prop="title">
                    <el-input v-model="ruleForm.title" />
                </el-form-item>

                <el-form-item label="产品简要描述" prop="introduction">
                    <el-input v-model="ruleForm.introduction" type="textarea" />
                </el-form-item>

                <el-form-item label="产品详细描述" prop="detail">
                    <el-input v-model="ruleForm.detail" type="textarea" />
                </el-form-item>

                <el-form-item label="产品图片" prop="cover">
                    <Upload :avatar="ruleForm.cover" @trigger="handleTrigger"/>
                </el-form-item>

                <el-form-item label="">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="SubmitEvent">
                        Confirm
                    </el-button>
                </el-form-item>

            </el-form>
        </el-dialog>
    </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios';
import formatTime from '@/util/formatTime';
import Upload from '@/components/upload/Upload.vue';
import upload from '@/util/upload';
const tableData = ref([])
const dialogVisible = ref(false)
const ruleFormRef = ref()
const ruleForm = reactive({
    id:0,
    title: "",
    introduction: "",
    detail: "",
    cover: "",
    file: null
})
const rules = reactive({
    title: [{ required: true, message: 'Please input username', trigger: 'blur' }],
    introduction: [{ required: true, message: 'Please input username', trigger: 'blur' }],
    detail: [{ required: true, message: 'Please input username', trigger: 'blur' }],
    cover: [{ required: true, message: 'Please input username', trigger: 'blur' }],

})
onMounted(() => {
    GetProductdata()
})
const GetProductdata = async () => {
    const res = await axios.get('http://localhost:3000/api/product/productList')
    // console.log(res.data.data)
    tableData.value = res.data.data
}
const handleDle = async (value) => {
    // console.log(value.id)
    await axios.delete(`http://localhost:3000/api/product/productList/${value.id}`)
    GetProductdata()
}
const handleEdit = (value) => {
    Object.assign(ruleForm,value)
    // console.log(ruleForm.cover)
    dialogVisible.value = true
}
const handleTrigger = (file) => {
    // console.log(URL.createObjectURL(file))
    ruleForm.cover = URL.createObjectURL(file)
    ruleForm.file = file
}
const SubmitEvent = () => {
    dialogVisible.value = false
    ruleFormRef.value.validate(async(valid)=>{
        if(valid){
            // console.log(ruleForm)
            await upload('http://localhost:3000/api/product/productList',ruleForm)
            
            // console.log(res.data)
        }
    })
}
</script>
<style scoped>
.card {
    margin-top: 30px;
}
</style>