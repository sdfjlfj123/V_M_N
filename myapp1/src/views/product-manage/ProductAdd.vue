<template>
    <div>
        <el-page-header :icon="null" title="产品管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 添加产品 </span>
            </template>
        </el-page-header>

        <el-card class="card">
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
                class="demo-ruleForm" status-icon>
                <el-form-item label="产品名称">
                    <el-input v-model="ruleForm.title" />
                </el-form-item>

                <el-form-item label="产品简要描述">
                    <el-input v-model="ruleForm.introduction" type="textarea" />
                </el-form-item>

                <el-form-item label="产品详细描述">
                    <el-input v-model="ruleForm.detail" type="textarea" />
                </el-form-item>

                <el-form-item label="产品图片">
                    <Upload :avatar="ruleForm.cover" @trigger="handleTrigger" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm()">
                        添加产品
                    </el-button>
                </el-form-item>

            </el-form>
        </el-card>
    </div>
</template>
<script setup>
import { ref, reactive } from "vue"
import Upload from "@/components/upload/Upload.vue";
import upload from "@/util/upload";
import router from "@/router";
const ruleFormRef = ref()
const ruleForm = reactive({
    title: "",
    introduction: "",
    detail: "",
    cover: "",
    file: null
})
const rules = reactive({
    title: [
        { required: true, message: 'Please input username', trigger: 'blur' },],
    introduction: [
        { required: true, message: 'Please input username', trigger: 'blur' },],
    detail: [
        { required: true, message: 'Please input username', trigger: 'blur' },],
    cover: [
        { required: true, message: 'Please input username', trigger: 'blur' },],
})
const handleTrigger = (file) => {
    ruleForm.cover = URL.createObjectURL(file)
    ruleForm.file = file
}

const submitForm = () => {
    ruleFormRef.value.validate(async (valid) => {
        if (valid) {
            // console.log(ruleForm)
            const res = await upload('http://localhost:3000/api/product/productAdd', ruleForm)
            // console.log(res)
            router.push("/product/productList")
            // ElMessage.success("添加成功")
        }
    })
}
</script>
<style scoped>
.card {
    margin-top: 30px;
}
</style>