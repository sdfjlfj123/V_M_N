<template>
    <div class="container">
        <el-carousel height="calc(100vh - 60px)">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small justify-center" text="2xl">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
        <div class="center">
            互联网+时代
        </div>
    </div>
</template>
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.container {
    position: relative;
}

.center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 60px;
    text-align: center;
}
</style>