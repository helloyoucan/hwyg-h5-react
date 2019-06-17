import request from '@/utils/request.js'
export function getBrannerList(){
    return request({
        url:'/branners/list',
        method:'POST',
        data:`
            {
                _schema{
                    list{
                        brannerName
                        imgUrl
                    }
                    code
                    message
                }
            }
        `
    })
}