import Loadable from 'react-loadable';
import Loading from '@/components/base/Loading/index'
import Index from '@/containers/Index/index'
// import Main from '@/containers/Index/index'
function AsyncLoad(loaderFn: () => Promise<any>,delay?:number) {
    return Loadable({
        loader: loaderFn,
        loading: Loading,
        delay: delay||500,
        timeout: 10000
    });
}
const ErrorRouter = {
    path: '*',
    component: AsyncLoad(()=>import('@/containers/ErrorPage/index'))
}
export default [
    {
        path: '/',
        exact: true,
        component: Index
    },
    {
        path: '/main',
        component: AsyncLoad(()=>import('@/components/layout/AppMain/index')),
        children: [
            {
                path: 'home',
                meta: {},
                component: AsyncLoad(() => import('@/containers/Home/index'),1000)
            },
            {
                path: 'goods',
                meta: {},
                component:AsyncLoad(() => import('@/containers/Goods/index'))
            },
            {
                path: 'auction',
                meta: {},
                component: AsyncLoad(() => import('@/containers/Auction/index'))
            },
            {
                path: 'news',
                meta: {},
                component: AsyncLoad(() => import('@/containers/News/index'))
            },
            {
                path: 'mine',
                meta: {},
                component: AsyncLoad(() => import('@/containers/User/index'))
            },
            ErrorRouter
        ]
    },
    ErrorRouter
]