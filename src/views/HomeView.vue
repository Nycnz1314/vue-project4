<script setup>
import {getByKid} from "@/apis/article";
import { ref,onMounted } from 'vue';
import {getAll} from "@/apis/Kind";
import {usepicStore} from "@/stores/picStore";
const picIp=usepicStore().picIp
const value=ref("")
const activ = ref(0);
const active = ref(0);
const list = ref([]);
const kindList=ref([])
onMounted(()=>{
  onClickTab({name:0})
  getAll().then(res=>{
    kindList.value=res;
  })
})
const onClickTab=({name})=>{
  getByKid(name+1).then((res)=>{
    list.value=res;
  })
}
</script>

<template>
  <div>
    <div class="top">
      <van-search
          v-model="value"
          shape="round"
          background="#ee0a24"
          placeholder="请输入搜索关键词"
      />
      <van-tabs v-model:active="activ" color="#ee0a24" title-active-color="#ee0a24" @click-tab="onClickTab">
        <van-tab :title="item.content" v-for="item in kindList" :key="item.kid"></van-tab>
      </van-tabs>
    </div>
    <div class="list">

      <div class="card" v-for="item in list" :key="item.aid">
        <router-link :to="'detail/'+item.aid">
        <van-row>
          <van-col span="16" class="content">
            <div class="title">{{ item.title }}</div>
            <div class="time">{{ item.time }}</div>
          </van-col>
          <van-col span="8">
            <img class="img" :src="picIp+item.picture">
          </van-col>
         </van-row>
        </router-link>
        <van-divider />
      </div>

    </div>
    <van-back-top right="5" bottom="50"/>

  </div>
</template>

<style scoped>
.img{
  width: 100%;
  height: 90px;
}
.card{
  margin: 5px 2px;
}
.title{
  font-size: 20px;
  color: #2c3e50;
}
.time{
  color: #999;
}
.content{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.top{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
.list{
  margin-top: 100px;
  margin-bottom: 50px;
}
</style>