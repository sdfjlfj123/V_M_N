<template>
    <div class="container">
        <el-card class="box-card">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                status-icon>
                <el-form-item label="username" prop="username">
                    <el-input v-model="ruleForm.username" />
                </el-form-item>
                <el-form-item label="password" prop="password">
                    <el-input v-model="ruleForm.password" type="password"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Login</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script setup>
import router from '@/router';
import { reactive, ref } from 'vue'
import axios from 'axios';
import userStore from '@/stores/user';
// do not use same name with ref
const store = userStore()
const ruleFormRef=ref()
const ruleForm = reactive({
    username: "",
    password: ""
})
const rules = reactive({
    username: [
        {
            required: true,
            trigger: 'blur',
            message: '请输入用户名',
        }],
    password: [
        {
            required: true,
            trigger: 'blur',
            message: '请输入密码',
        }],
})

const onSubmit = () => {
    ruleFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await axios.post('http://localhost:3000/api/user/login', {
                username: ruleForm.username,
                password: ruleForm.password
            })
            if (res.data) {
                // console.log(res.data)
                store.changeUser(res.data)
                router.push('/')
            }
            // localStorage.setItem("token", '1234') 
        }
    })

}

</script>
<style scoped>
.container {
    display: grid;
    place-items: center;
    /* 水平和垂直居中 */
    height: 100vh;
    /* 使容器充满视口高度 */
    margin: 0;
    background-image: url('https://b.53326.com/dydao/d/20200101/zdsaaswzsh1.jpg');
    background-size: cover;
    opacity: 0.75;
    /* 去掉默认的边距 */
 /* Optional: To cover the entire container */
}

.el-card {
    border: 1px solid grey;
    z-index: 100;
}
</style>