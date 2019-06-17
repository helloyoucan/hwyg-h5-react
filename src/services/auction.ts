import request from '@/utils/request.js'
interface SealParams{
    page?:number,
    size?:number
}
export function getSealList({page,size}:SealParams){
    return request({
        url:'/auction/seal/list',
        method:'POST',
        data:`
            {
                _schema(size:${size},page:${page}){
                    list{
                        title
                        status
                        startPrice
                        beginTime
                        endTime
                        corpore{
                            name
                            quantity
                            measureUnit
                        }
                        summary{
                            currentPrice
                            bidNumber
                        }
                        coverUrls
                        dealPrice
                        dealTime
                        bidType
                    }
                    code
                    message
                }
            }
        `
    })
}
enum EnumRang {
    today = "today",
    future = "future",
    previous = "previous"
}
interface SceneParams{
    size?:number,
    page?:number,
    rang?:EnumRang
}
export function getSceneList({page,size,rang}:SceneParams){
    return request({
        url:'/auction/scene/list',
        method:'POST',
        data:`
            {
                _schema(size:${size},page:${page},rang:"${rang}"){
                    list{
                        beginTime
                        endTime
                        corporeCount
                        coverUrls
                        name
                        onlookNumber
                        status
                        dealNumber
                        participants
                        bidType
                        bidNumber
                    }
                    code
                    message
                }
            }
        `
    })
}