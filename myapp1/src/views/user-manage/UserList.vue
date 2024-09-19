<template>
    <div>
        <el-page-header :icon="null" title="用户管理">
            <template #content>
                <span class="text-large font-600 mr-3">用户列表</span>
            </template>
        </el-page-header>

        <el-card class="card">
            <el-table :data="tableData">
                <el-table-column prop="username" label="用户名" width="180" />
                <el-table-column prop="avatar" label="头像" width="180">
                    <template #default="scope">
                        <div v-if="scope.row.avatar">
                            <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar">
                            </el-avatar>
                        </div>
                        <div v-else>
                            <el-avatar :size="50"
                                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="角色">
                    <template #default="scope">
                        <el-tag v-if="scope.row.role === 1" class="ml-2" type="success">管理员</el-tag>
                        <el-tag v-if="scope.row.role === 2" class="ml-2" type="danger">编辑</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <el-popconfirm title="Are you sure to delete this?" confirm-button-text="确定"
                            cancel-button-text="取消" @confirm="confirmEvent(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger">Delete</el-button>
                            </template>
                        </el-popconfirm>
                        <el-button @click="handleEdit(scope.row)">
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog v-model="dialogVisible" title="编辑用户" width="500">

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
            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="SubmitEvent">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted, reactive } from 'vue';
const tableData = ref([])
const dialogVisible = ref(false)
const ruleFormRef = ref()
const ruleForm = reactive({
    username: "",
    password: "",
    role: 2,
    introduction: "",
    id:null
})

const rules = reactive({
    username: [
        { required: true, message: 'Please input username', trigger: 'blur' },],
    password: [
        { required: true, message: 'Please input username', trigger: 'blur' },],
    role: [
        { required: true, message: 'Please input username', trigger: 'blur' },],
    introduction: [
        { required: true, message: 'Please input username', trigger: 'blur' },],

})
const options = [
    {
        label: '管理员',
        value: 1
    },
    {
        label: '编辑',
        value: 2
    }
]

onMounted(() => {
    getUserData()
})
const getUserData = async () => {
    const res = await axios.get('http://localhost:3000/api/user/userList')
    // console.log(res.data.data)
    tableData.value = res.data.data
}
const handleEdit = (value) => {
    const { username, password, introduction, role,id } = value
    ruleForm.username = username
    ruleForm.password = password
    ruleForm.introduction = introduction
    ruleForm.role=role
    ruleForm.id=id
    // console.log(value.username)
    dialogVisible.value = true
}
const confirmEvent = async (value) => {
    const res = await axios.delete(`http://localhost:3000/api/user/userList/${value.id}`)
    getUserData()
}
const SubmitEvent = () => {
    dialogVisible.value = false
    ruleFormRef.value.validate(async(valid)=>{
        if(valid){
            // console.log(ruleForm)
            const res=await axios.post('http://localhost:3000/api/user/userList',ruleForm)
            console.log(res.data.result)
        }
    })
}
</script>
<style scoped>
.card {
    margin-top: 30px;
}
</style>