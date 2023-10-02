import request from '@/utils/request.js'
 
export function getCategory() {
    return request.get('/category/list')
}