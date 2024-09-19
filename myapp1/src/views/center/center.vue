<template>
    <div>
        <el-page-header :icon="null" title="新闻管理系统">
            <template #content>
                <span class="text-large font-600 mr-3"> 个人中心 </span>
            </template>
        </el-page-header>
        <el-row :gutter="30" class="el-row">
            <el-col :span="6">
                <el-card class="card">
                    <el-avatar :size="100" :src="avatarUrl" />
                    <h3>{{ store.userdata.username }}</h3>
                    <h5>{{ store.userdata.role === 1 ? '管理员' : '编辑' }}</h5>
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>个人信息</span>
                        </div>
                    </template>
                    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules"
                        label-width="auto" class="demo-ruleForm" status-icon>
                        <el-form-item label="username" prop="username">
                            <el-input v-model="ruleForm.username" />
                        </el-form-item>

                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="ruleForm.gender" class="m-2" placeholder="Select" style="width: 100%;">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="个人简介" prop="introducton">
                            <el-input v-model="ruleForm.introduction" type="textarea" />
                        </el-form-item>

                        <el-form-item label="头像" prop="avatar">
                            <!-- <el-upload class="avatar-uploader"
                                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                :show-file-list="false" :auto-upload="false" :on-change="handleChange">
                                <img v-if="ruleForm.avatar" :src="uploadAvatar" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload> -->

                            <Upload :avatar="ruleForm.avatar" @trigger="handleTrigger"/>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm()">
                                更新
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>
<script setup>
import userStore from '@/stores/user';
import upload from '@/util/upload';
import Upload from '@/components/upload/Upload.vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref, reactive, computed } from 'vue';
const store = userStore()
// console.log(store.userdata)
const ruleFormRef = ref()
const ruleForm = reactive({
    username: store.userdata['username'],
    gender: store.userdata['gender'],
    introduction: store.userdata['introduction'],
    avatar: store.userdata['avatar'],
    file: null
})
const rules = reactive({
    name: [
        { required: true, message: 'Please input username', trigger: 'blur' },],
    gender: [
        { required: true, message: 'Please input 性别', trigger: 'blur' },],
    introduction: [
        { required: true, message: 'Please input username', trigger: 'blur' },],
    avatar: [
        { required: true, message: 'Please input username', trigger: 'blur' },],

})
const options = [
    {
        label: '保密',
        value: 0
    },
    {
        label: '男',
        value: 1
    },
    {
        label: '女',
        value: 2
    },

]
const avatarUrl = computed(
    () => {
        return ruleForm.avatar ? 'http://localhost:3000' + ruleForm.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
)
// const uploadAvatar = computed(
//     () => {
//         return ruleForm.avatar.includes('blob') ? ruleForm.avatar : 'http://localhost:3000' + ruleForm.avatar
//     }
// )
// const handleChange = (file) => {
//     // console.log(file.raw)
//     ruleForm.avatar = URL.createObjectURL(file.raw)

//     ruleForm.file = file.raw
// }

const handleTrigger=(file)=>{
    ruleForm.avatar=URL.createObjectURL(file)
    ruleForm.file=file
}
const submitForm = () => {
    ruleFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await upload('http://localhost:3000/api/user/center', ruleForm)
            if (res.data) {
                // console.log(res.data.data)
                store.changeUser(res.data.data)
                // console.log(store.userdata)
                ElMessage.success("更新成功")
            }
            // console.log(ruleForm)
            // const params = new FormData()
            // for (let i in ruleForm) {
            //     params.append(i, ruleForm[i])
            // }
            // console.log(params)
            // axios.post('http://localhost:3000/api/user/center', params, {
            //     headers: {
            //         "Content-Type": 'multipart/form-data'
            //     }
            // }).then(res => {

            //     if (res.data.data) {
            //         // console.log(res.data.data)
            //         store.changeUser(res.data.data)
            //         ElMessage.success("更新成功")
            //         // console.log(store)
            //     }
            // })


        }
    })
}
</script>
<style scoped>
.el-row {
    margin-top: 30px;
}

.card {
    text-align: center;
}

/* ::v-deep .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
} */
</style>