import http from "@/utils/http";
//ע��
export function regist(formData){
    return http.postFile("user/regist",formData)
}
//��¼
export function login(formData){
    return http.post("user/login",formData)
}
