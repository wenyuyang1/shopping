import request from '@/utils/request.js'
 
export function getSeachGoodsComprehensive(info) { 
    const { categoryId,goodsName,page} =info
    return request.get('/goods/list', {
        params: {
            categoryId,
            goodsName,
            page,
        }
    })
}


export function getSeachGoodsSales(info) {
    const { categoryId,goodsName,page} =info
    return request.get('/goods/list', {
        params: {
            sortType: 'sales',
            categoryId,
            goodsName,
            page,
        }
    })
}
 

export function getSeachGoodsPriceLow(info) { 
    const { categoryId,goodsName,page} =info
    return request.get('/goods/list', {
        params: {
            sortType: 'price',
            sortPrice: 0,
            categoryId,
            goodsName,
            page,
        }
    })
}



export function getSeachGoodsPriceHeight(info) { 
    const { categoryId,goodsName,page} =info
    return request.get('/goods/list', {
        params: {
            sortType: 'price',
            sortPrice: 1,
            categoryId,
            goodsName,
            page,
        }
    })
}