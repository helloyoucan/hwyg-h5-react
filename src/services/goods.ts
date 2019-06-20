import request from '@/utils/request.js'
enum Type{
    supply=1,
    purchase=2
}
export function getGoodsList(type:Type){
    return request({
        url:'/goods/list',
        method:'POST',
        data:`
            {
                _schema(size:10,page:1,status:1,type:${type}){
                list{
                    defaultImage
                    productName
                    specification
                    addedTime
                    unit
                    unitPrice
                    totalAmount
                }
                code
                message
            }
        }
        `
    })
}