<script setup>
import { ref,onMounted } from 'vue';
import {login} from "@/apis/user";
import {usepicStore} from "@/stores/picStore";
import {useUserStore} from "@/stores/userStore";
const userStore=useUserStore();
const picIp=usepicStore().picIp
const show=ref(true)
const username = ref('');
const password = ref('');
const msg=ref('')
const user=ref({
  username:'',
  uid:0,
  image:''
})
const onClickLeft=()=>history.back()
onMounted(()=>{
  if(userStore.userInfo.username!=undefined){
    //已登录的状态
    user.value=userStore.userInfo;
    //登录框隐藏
    show.value=false;
  }
})
const onSubmit = (values) => {
  login({"username": username.value, "password": password.value})
      .then(res=>{
      if(res.code==0){
        msg.value="您输入的用户名或密码错误，登录失败!"
        return;
    }
        user.value=res;
        userStore.setUserInfo(res);
        show.value=false;
        msg.value=''
  })
};
const quit=()=>{
  user.value={
    username:'',
        uid:0,
      image:''
  }
  userStore.clearUserInfo()
  show.value=true;
}
</script>

<template>
  <van-nav-bar
      title=""
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <div v-if="!show">
  <van-row>
    <van-col span="4">
      <van-image
          round
          width="5rem"
          height="5rem"
          :src="picIp+user.image"
      />

    </van-col>
    <van-col span="10" offset="2" class="username">
      {{user.username}}
    </van-col>
  </van-row>
    <van-row class="info1">
      <van-col span="6">
        <div class="digit">0</div>
        <div class="text">头条</div>
      </van-col>
      <van-col span="6">
        <div class="digit">0</div>
        <div class="text">获赞</div>
      </van-col>
      <van-col span="6">
        <div class="digit">0</div>
        <div class="text">粉丝</div>
      </van-col>
      <van-col span="6">
        <div class="digit">0</div>
        <div class="text">关注</div>
      </van-col>
    </van-row>



    <van-row class="info1">
      <van-col span="6">
        <div class="digit">
          <van-icon name="fire-o" color="#ee0a24" size="2rem"/>
        </div>
        <div class="text">头条</div>
      </van-col>
      <van-col span="6">
        <div class="digit">
          <van-icon name="star-o" color="#ee0a24" size="2rem"/>
        </div>
        <div class="text">获赞</div>
      </van-col>
      <van-col span="6">
        <div class="digit">
          <van-icon name="gift-o" color="#ee0a24" size="2rem"/>
        </div>
        <div class="text">粉丝</div>
      </van-col>
      <van-col span="6" @click="quit">
        <div class="digit">
          <van-icon name="share-o" color="#ee0a24" size="2rem"/>
        </div>
        <div class="text">退出登录</div>
      </van-col>
    </van-row>
  </div>
  <van-overlay :show="show">
    <div class="wrapper" @click.stop>
      <div class="block">
        <h1>登录</h1>
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field
                v-model="username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
          </van-cell-group>
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
        <div class="reg-link">
          <router-link to="/regist">还没有账号？点击此处进行注册！</router-link>
        </div>
        <div class="error">
          {{msg}}
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<style scoped>
.info1{
  text-align: center;
}
.info1 .text{
  margin: 10px 0;
  color: #999999;
  font-size: 14px;
}
.info1 .digit{
  font-size: 20px;
  margin: 10px 0;
}
.username{
  line-height: 5rem;
  font-size: 40px;
}
h1{
  text-align: center;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 100%;
  height: 350px;
  background-color: #fff;
}
.reg-link,.error{
  font-size: larger;
  text-align: right;
  margin: 5px 0;
}
.error{
  color: red;
}
</style>