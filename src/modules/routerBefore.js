import router from "@/router"
import store from "@/store"
import nprogress from "nprogress"
import 'nprogress/nprogress.css'

const whiteList = ['/', '/home', '/login', '/login/bypass', '/login/bycode', '/shop', '/loginUp']
let user = store.state.user
router.beforeEach((to, from, next) => {
    nprogress.start()
    if (user.token) {
        if (!user.name) {
            store.dispatch("user/getUserInfo").then(() => {
                next()
            }).catch(() => {
                // 前端登出，就是清除token
                if (whiteList.indexOf(to.path) != -1) {
                    next()
                } else {
                    next('/login')
                }
            })
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) != -1) {
            next()
        } else {
            next('/login')
        }
    }
})

router.afterEach(() => {
    nprogress.done()
})