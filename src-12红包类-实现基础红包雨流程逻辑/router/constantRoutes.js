export const staticRoutes = [
    {
        path: '/luckyMoney',
        name: 'luckyMoney',
        component: () => import('@/views/luckyMoney/luckyMoney.vue'),
        meta: {
            title: '方式一',
        },
    },
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/home.vue'),
        meta: {
            title: '首页',
        },
    },

]
