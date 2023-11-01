<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import {regist} from "../apis/user";

const onClickLeft = () => history.back();
const username = ref('');
const password = ref('');
const password1 = ref('');
const email = ref('');
const file=ref([]);
const onSubmit = (values) => {
  if(password.value!=password1.value){
    showToast("密码与确认密码不一致")
    return ;
  }
  let formData=new FormData(document.getElementsByClassName("form1")[0])
  if(file.value[0]==undefined){
    showToast("您未上传头像")
    return;
  }
  formData.append("file",file.value[0].file)
  regist(formData).then(res=>{})
  showToast("注册成功")
};
</script>

<template>
  <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-form class="form1" @submit="onSubmit" >
    <van-cell-group inset>
      <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="email "
          name="email"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
         :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
          v-model="password1"
          type="password"
          name="password1"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请填写确认密码' }]"
      />
      <van-field name="uploader" label="头像">
        <template #input>
          <van-uploader v-model="file" multiple :max-count="1" />
        </template>
      </van-field>

    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>