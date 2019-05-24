import Index from '@/containers/Index/index'
import AppMain from '@/components/layout/AppMain/index'
import Home from '@/containers/Home/index'
import Goods from '@/containers/Goods/index'
import Auction from '@/containers/Auction/index'
import News from '@/containers/News/index'
import ErrorPage from '@/containers/ErrorPage/index'
const ErrorRouter = {
    path:'*',
    component:ErrorPage
}
export default[
    {
        path:'/',
        exact:true,
        component:Index
    },
    {
        path:'/main',
        component:AppMain,
        children:[
            {
                path:'home',
                meta:{},
                component:Home
            },
            {
                path:'goods',
                meta:{},
                component:Goods
            },
            {
                path:'auction',
                meta:{},
                component:Auction
            },
            {
                path:'news',
                meta:{},
                component:News
            },
            ErrorRouter
        ]
    },
    ErrorRouter
]