<template>
    <div>
        <el-page-header :icon="null" title="用户管理">
            <template #content>
                <span class="text-large font-600 mr-3">添加用户</span>
            </template>
        </el-page-header>
        <el-card class="card">
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
                class="demo-ruleForm" status-icon>
                <el-form-item label="username" prop="username">
                    <el-input v-model="ruleForm.username" />
                </el-form-item>

                <el-form-item label="password" prop="password">
                    <el-input v-model="ruleForm.password" type="password" />
                </el-form-item>

                <el-form-item label="role" prop="role">
                    <el-select v-model="ruleForm.role" class="m-2" placeholder="Select" style="width: 100%;">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>

                <el-form-item label="个人简介" prop="introducton">
                    <el-input v-model="ruleForm.introduction" type="textarea" />
                </el-form-item>

                <el-form-item label="头像" prop="avatar">
                    <Upload :avatar="ruleForm.avatar" @trigger="handleTrigger"/>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm()">
                        添加用户
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import Upload from '@/components/upload/Upload.vue';
import upload from '@/util/upload';
import { ElMessage } from 'element-plus';
const ruleFormRef = ref()
const ruleForm = reactive({
    username: "",
    password: "",
    role: 2,
    introduction: "",
    avatar: "",
    file: null
})
const options = [
    {
        label: '管理员',
        value: 1
    },
    {
        label: '编辑',
        value: 2
    },

]
const handleTrigger=(file)=>{
    ruleForm.avatar=URL.createObjectURL(file)
    ruleForm.file=file
}
const submitForm=()=>{
    ruleFormRef.value.validate(async(valid)=>{
        if(valid){
            // console.log(ruleForm)
            const res=await upload('http://localhost:3000/api/user/userAdd',ruleForm)
            console.log(res)
            ElMessage.success("添加成功")
        }
    })
}
const rules = reactive({
    username: [
        { required: true, message: 'Please input username', trigger: 'blur' },],
    password: [
        { required: true, message: 'Please input username', trigger: 'blur' },],
    role: [
        { required: true, message: 'Please input username', trigger: 'blur' },],
    introduction: [
        { required: true, message: 'Please input username', trigger: 'blur' },],
    avatar: [
        { required: true, message: 'Please input username', trigger: 'blur' },],

})
</script>
<style scoped>
.card {
    margin-top: 30px;
}
</style>