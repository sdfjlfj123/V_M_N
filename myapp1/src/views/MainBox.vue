<template>
    <div class="common-layout">
        <el-container>
            <SliderMenu />
            <el-container direction="vertical">
                <TopHeader />
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import SliderMenu from '@/components/SliderMenu.vue';
import TopHeader from '@/components/TopHeader.vue';
</script>
<style scoped>
.el-main {
    height: calc(100vh - 60px);
    overflow: auto;
}
</style>