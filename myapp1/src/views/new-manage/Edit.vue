<template>
    <div>
        <el-page-header @back="handleBack()" title="新闻管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 新闻编辑 </span>
            </template>
        </el-page-header>

        <el-card class="card">

            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
                class="demo-ruleForm" status-icon>

                <el-form-item label="title" prop="title">
                    <el-input v-model="ruleForm.title" />
                </el-form-item>

                <el-form-item label="content" prop="content" >
                    <Editor @event="handleEvent" :content="ruleForm.content" v-if="ruleForm.content"/>
                </el-form-item>

                <el-form-item label="category" prop="category">
                    <el-select v-model="ruleForm.category" class="m-2" placeholder="Select" style="width: 100%;">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>

                <el-form-item label="封面" prop="cover">
                    <Upload :avatar="ruleForm.cover" @trigger="handleTrigger"/>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm()">
                        编辑新闻
                    </el-button>
                </el-form-item>

            </el-form>

        </el-card>
    </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import Editor from '@/components/editor/Editor.vue';
import Upload from '@/components/upload/Upload.vue';
import router from '@/router';
import {useRoute} from 'vue-router'
import axios from 'axios';
import upload from '@/util/upload';
const route=useRoute()
const ruleFormRef = ref()
const ruleForm = reactive({
    title: "",
    content: '',
    category: 1,
    cover: '',
    file: null,
    isPublish: 0//0未发布，1发布
})
onMounted(async()=>{
    // console.log(route.params.id)
    const res=await axios.get(`http://localhost:3000/api/news/newList/${route.params.id}`)
    // console.log(typeof(res.data.data['0'].content))
    // ruleForm.value=res.data.data
    Object.assign(ruleForm,res.data.data['0'])
    // console.log(ruleForm.cover)
})
const rules = reactive({
    title: [{ required: true, message: 'Please input title', trigger: 'blur' },],
    content: [
        { required: true, message: 'Please input title', trigger: 'blur' },],
    category: [
        { required: true, message: 'Please input title', trigger: 'blur' },],
    cover: [
        { required: true, message: 'Please input title', trigger: 'blur' },],
})
const options = [
    {
        label: '最新案例',
        value: 1
    },
    {
        label: '典型案例',
        value: 2
    },
    {
        label: '通知公告',
        value: 3
    }
]
const handleBack=()=>{
    router.back()
}
const handleTrigger = (file) => {
    // console.log(URL.createObjectURL(file))
    ruleForm.cover = URL.createObjectURL(file)
    ruleForm.file = file
}
const handleEvent = (data) => {
    // console.log(data)
    ruleForm.content = data
}
const submitForm=()=>{
    ruleFormRef.value.validate(async(valid)=>{
        if(valid){
            console.log(ruleForm)
            const res=await upload('http://localhost:3000/api/news/newList',ruleForm)
            router.back()
        }
    })
}
</script>
<style scoped>
.card {
    margin-top: 30px;
}
</style>