<template>
    <el-header>新闻管理系统
        <el-icon><Sunrise /></el-icon>
        <el-dropdown placement="bottom-end">
            <el-avatar :icon="UserFilled" ></el-avatar>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handleClick">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </el-header>
</template>
<script setup>
import router from '@/router';
import { UserFilled } from '@element-plus/icons-vue'
const handleClick = () => {
    localStorage.removeItem('token')
    router.push('/login')
}
</script>
<style scoped>
.el-header {
    background-color: gray;
    color: white;
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.el-popper.is-customized {
    /* Set padding to ensure the height is 32px */
    padding: 6px 12px;
    background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
    background: linear-gradient(45deg, #b2e68d, #bce689);
    right: 0;
}
</style>