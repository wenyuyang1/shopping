import request from '@/utils/request'

// 添加地址
export function addAddress(detail,name,phone,v1,v2,v3) { 
    return request.post('/address/add', {
        form: {
            detail,name, phone, region: [{
                value: 1,
                label: v1
            },{
                value: 2,
                label: v2
            },{
                value: 3,
                label: v3
            }]
        }
    })
}


export function getAddress() {
    return request.get('/address/list')
 }