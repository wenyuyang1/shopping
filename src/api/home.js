import request from '@/utils/request.js'
export function getGoods() { 
    return request.get("/page/detail", {
        pageId:0
    })
}