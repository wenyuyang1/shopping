import request from '@/utils/request.js'


export function getProdetail(goodsId) { 
    return request.get('/goods/detail', {
        params: {
            goodsId
        }
    })
}


export function getComment(goodsId, limit) {
    return request.get('/comment/listRows', {
        params: {
            goodsId,
            limit
        }
    })
}



