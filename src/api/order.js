import request from '@/utils/request.js'

export function getOrderList(dataType,page) { 
    return request.get('/order/list', {
        params: {
            dataType,
        page}
    })
}

export function postCancelOrder(orderId) { 
    return request.post('/order/cancel', {
        orderId
    })
}