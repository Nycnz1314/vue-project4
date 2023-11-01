
<script setup>
import { ref ,onMounted} from 'vue';
import {usepicStore} from "@/stores/picStore";
import {getByAid,downloadFile} from "../apis/article";
import {useRoute} from 'vue-router'
const onClickLeft = () => history.back();
const route=useRoute();
const picIp=usepicStore().picIp
const aid=route.params.aid;
const article=ref({})
const status=ref(false)
const download = () => {
  let pictureFileName = article.value.picture;
  let videoFileName = article.value.video;

  let downloadType = prompt("你想要下载图片还是歌曲 '图片' or '歌曲'");

  // 用户选择下载图片
  if(downloadType.toLowerCase() === '图片' && pictureFileName){
    downloadFile(pictureFileName).then(res => {
      downloadBlob(res, pictureFileName);
    })
  }

  // 用户选择下载视频
  if(downloadType.toLowerCase() === '歌曲' && videoFileName){
    downloadFile(videoFileName).then(res => {
      downloadBlob(res, videoFileName);
    })
  }
}

// 抽取为公共函数，用来下载Blob数据
function downloadBlob(res, fileName){
  let url = URL.createObjectURL(new Blob([res]))
  // 创建a超链接
  let a = document.createElement("a");
  a.href = url; // 超链接href指向下载的文件
  a.style.display = 'none'; // 代表a超链接不可见
  a.setAttribute("download", fileName);
  // a标签加入到页面中
  document.body.appendChild(a);
  a.click(); // 模拟点击行为
  // 释放资源
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
onMounted(()=>{
  getByAid(aid).then(res=>{
    article.value=res;
    status.value=true;
  })
})
</script>
<template>
  <van-nav-bar
      title=""
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-space direction="vertical" v-if="status">
<div class="title">{{article.title}}</div>
  <div class="time">{{article.time}}</div>
    <van-image
        width="100%"
        height="300"
        :src="picIp+article.picture"
    />
    <div>
      <video :src="picIp+article.video" controls></video>
    </div>
    <div @click="download">下载</div>
<!--    <van-radio-group v-model="checked">-->
<!--&lt;!&ndash;      <van-radio name="图片" checked-color="#ee0a24">下载图片</van-radio>&ndash;&gt;-->
<!--&lt;!&ndash;      <van-radio name="歌曲" checked-color="#ee0a24">下载歌曲</van-radio>&ndash;&gt;-->
<!--    </van-radio-group>-->
  <div class="content">{{article.content}}</div>
  </van-space>
</template>
<style scoped>
.title{
  font-size: 24px ;
}
.time{
  font-size: 13px;
}
.content{
  text-indent: 2em;
  line-height: 1.8;
}
video{
  width: 100%;
  height: 25px;
}

</style>