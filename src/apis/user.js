import http from "@/utils/http";
//×¢²á
export function regist(formData){
    return http.postFile("user/regist",formData)
}
//µÇÂ¼
export function login(formData){
    return http.post("user/login",formData)
}
