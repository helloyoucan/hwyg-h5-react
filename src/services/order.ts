import request from '@/utils/request.js'
export function getBrannerList(){
    return request({
        url:'/order/traded',
        method:'POST',
        data:`
            {
                _schema(size:10,page:1){
                    list{
                        productName
                        amount
                        unit
                        unitPrice
                        price
                        time
                    }
                    code
                    message
                }
            }
        `
    })
}