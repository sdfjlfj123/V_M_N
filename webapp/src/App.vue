<template>
  <div>
    <Navbar/>
    <router-view/>
  </div>
</template>
<script setup>
import Navbar from './components/Navbar.vue'
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
}
</style>