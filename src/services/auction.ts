import request from '@/utils/request'
interface sealParams{
    page?:number,
    size?:number
}
export function getSealList({page,size}:sealParams){
    return request({
        url:'/auction/seal/list',
        method:'POST',
        data:`
        data{
            list(page:${page},size:${size}){
                id
            }
            code
            success
        }
        `
    })
}