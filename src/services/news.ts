import request from '@/utils/request.js'
interface Params {
    size?: number,
    page?: number,
    keyWord?: string
}
export function getNewsList({ size = 10, page = 1, keyWord = '' }: Params) {
    return request({
        url: '/news/list',
        method: 'POST',
        data: `
            {
                _schema(size:${size},page:${page}${keyWord? ',keyWord:' + keyWord : ''}){
                	list{
                        title
                        checkNumber
                        createTime
                        content
                    }
                    pager{
                        totalPages
                    }
                    message
                    code
            }
        }
        `
    })
}