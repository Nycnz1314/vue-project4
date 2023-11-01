import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    //1.定义管理用户信息的state
    const userInfo=ref({});
    //2.登录成功时存储用户信息
    const setUserInfo=(user)=>{
        userInfo.value=user;
    }
    //3.退出登录时清空用户信息
    const clearUserInfo=()=>{
        userInfo.value={};
    }
    return {userInfo,setUserInfo,clearUserInfo}
},{
    persist:true
})
