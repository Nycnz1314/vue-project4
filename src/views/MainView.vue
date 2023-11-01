<script setup>
import { ref,onMounted } from 'vue';
const active = ref(0);
</script>
<template>
  <router-view></router-view>
  <van-tabbar v-model="active" active-color="#ee0a24" route>
    <van-tabbar-item to="/home" icon="wap-home">首页</van-tabbar-item>
    <van-tabbar-item icon="play-circle">视频</van-tabbar-item>
    <van-tabbar-item icon="vip-card">放映厅</van-tabbar-item>
    <van-tabbar-item to="/mine" icon="manager">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style>

</style>