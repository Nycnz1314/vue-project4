import http from "@/utils/http";
//根据分类获取文章列表
export function getByKid(kid){
    return http.get("article/getByKid?kid="+kid)
}
//根据aid获取文章详情
export function getByAid(aid){
    return http.get("article/getByAid?aid="+aid)
}
//下载
export function downloadFile(fileName){
    return http.getFile("article/downloadFile?fileName="+fileName)
}