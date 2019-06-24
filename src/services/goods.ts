import request from '@/utils/request.js'
enum Type {
    supply = 2,
    purchase = 1
}
interface Params {
    type: Type,
    size?: number,
    page?: number,
}
export function getGoodsList({ size = 10, page = 1, type = 1 }: Params) {
    return request({
        url: '/goods/list',
        method: 'POST',
        data: `
            {
                _schema(size:${size},page:${page},status:1,type:${type}){
                list{
                    defaultImage
                    productName
                    specification
                    addedTime
                    unit
                    unitPrice
                    totalAmount
                    quoteType
                }
                pager{
                    totalPages
                }
                code
                message
            }
        }
        `
    })
}