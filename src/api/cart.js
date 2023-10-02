import request from '@/utils/request'
export function postAddCart(goodsId, goodsNum, goodsSkuId) {
    return request.post('/cart/add', {
        goodsId,
        goodsNum,
        goodsSkuId
    })
}


export function getCartList() {
    return request.get('/cart/list')
}

export const changeGoodCount = (goodsId, goodsNum, goodsSkuId) => {
    return request.post('/cart/update', {
      goodsId,
      goodsNum,
      goodsSkuId
    })
}
  

export const deleteGoods = (cartIds) => { 
    return request.post('/cart/clear', {
        cartIds
    })
}