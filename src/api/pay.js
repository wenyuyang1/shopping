import request from '@/utils/request'
    

export function getOrderForm(mode,Data) { 
    return request.get('/checkout/order', {
        params: {
            mode,
        delivery: 10,
        couponId: 0,
        iUsePoints: 0,
        payType:10,
        ...Data
        }
    })
}


export function submitOrder(mode,remark, Data) { 
    return request.post('/checkout/order', {
        mode,
        delivery: 10,
        couponId: 0,
        iUsePoints: 0,
        remark,
        payType:10,
        ...Data
    })
}

