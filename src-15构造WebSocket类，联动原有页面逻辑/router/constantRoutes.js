export const staticRoutes = [
    {
        path: '/luckyMoney',
        name: 'luckyMoney',
        component: () => import('@/views/luckyMoney/luckyMoney.vue'),
        meta: {
            title: '写法',
        },
    },
    {
        path: '/luckyMoneyRain',
        name: 'luckyMoneyRain',
        component: () => import('@/views/luckyMoneyRain/luckyMoneyRain.vue'),
        meta: {
            title: '红包雨',
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
