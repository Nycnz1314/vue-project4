import http from "@/utils/http";
//分类列表
export function getAll(){
    return http.get("kind/getAll")
}
