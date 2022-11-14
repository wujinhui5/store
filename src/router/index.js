import { createRouter, createWebHashHistory } from "vue-router"
const StoreHome = () => import("../pages/home/StoreHome")
const StoreLogin = () => import("../pages/login/StoreLogin")
const ShopPage = () => import("../pages/shop/ShopPage")
const LoginUp = () => import("../pages/loginUp/LoginUp")
const ByPhoneCode = () => import("../pages/login/components/ByPhoneCode")
const ByPassword = () => import("../pages/login/components/ByPassword")
const ShopCar = () => import("../pages/shopCar/ShopCar")
const OrderForm = () => import("../pages/orderForm/OrderForm")
const UncompletedOrder = () => import("../pages/orderForm/components/UncompletedOrder")
const CompletedOrder = () => import("../pages/orderForm/components/CompletedOrder")
const RefundingOrder = () => import("../pages/orderForm/components/RefundingOrder")
const AllOrder = () => import("../pages/orderForm/components/AllOrder")

let routes = [
    {
        path: '/',
        redirect: '/home',
        children: [{
            path: '/home',
            component: StoreHome
        }]
    },
    {
        path: '/login',
        component: StoreLogin,
        redirect: '/login/bycode',
        children: [
            {
                path: 'bycode',
                component: ByPhoneCode
            },
            {
                path: 'bypass',
                component: ByPassword
            }
        ]
    },
    {
        path: '/loginUp',
        component: LoginUp
    },
    {
        path: '/shop',
        component: ShopPage
    },
    {
        path: '/shopcar',
        component: ShopCar
    },
    {
        path: '/order',
        redirect: '/order/uncompleted',
        component: OrderForm,
        children: [
            {
                path: 'uncompleted',
                component: UncompletedOrder
            },
            {
                path: "completed",
                component: CompletedOrder,
            },
            {
                path: "refunding",
                component: RefundingOrder,
            },
            {
                path: "all",
                component: AllOrder,
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router