import users from '../json/users.json'
import cookie from 'js-cookie'
import NProgress from 'nprogress'

let headPortrait = require("../imags/headPortrait/headPortrait.jpg")

for (let k in users) {
    users[k].headPortrait = headPortrait
}


export default {

    // 密码登录
    loginByPass: option => {
        let loginForm = JSON.parse(option.body)
        // 这里简单模拟下后台登录验证
        if (users[loginForm.phone] && loginForm.password === '12345678a!') {
            return JSON.stringify({
                meta: {
                    msg: "登录成功",
                    status: 200
                },
                data: users[loginForm.phone]
            })
        } else {
            NProgress.done()
            return JSON.stringify({
                meta: {
                    status: 999,
                    msg: '账户或者密码错误！'
                }
            })
        }
    },

    // 验证码登录
    loginByCode: option => {
        let loginForm = JSON.parse(option.body)
        // 这里简单模拟下后台登录验证
        NProgress.done()
        if (!users[loginForm.phone]) {
            return JSON.stringify({
                meta: {
                    msg: "该手机号未注册",
                    status: 998
                }
            })
        }
        if (loginForm.code === "123456") {
            return JSON.stringify({
                meta: {
                    msg: "登录成功",
                    status: 200
                },
                data: users[loginForm.phone]
            })
        }
        return JSON.stringify({
            meta: {
                status: 999,
                msg: '验证码错误！'
            }
        })
    },

    // 获取用户信息
    getInfo: () => {
        // 模拟从请求头获取token
        let token = cookie.get('token')
        NProgress.done()
        for (let k in users) {
            if (token === users[k].token) {
                return JSON.stringify({
                    meta: {
                        msg: "登录成功",
                        status: 200
                    },
                    data: users[k]
                })
            }
        }
        return JSON.stringify({
            meta: {
                status: 998,
                msg: '登录状态失效！'
            }
        })
    },

    // 登出
    logout: option => {
        let phone = option.body
        NProgress.done()
        console.log(phone + '用户已退出登录！')
        return JSON.stringify({
            meta: {
                status: 200,
                msg: "退出登录成功！"
            }
        })
    },

    // 修改个人用户名
    changeUserName: option => {
        let data = JSON.parse(option.body)
        NProgress.done()
        for (let i in users) {
            if (data.uid === users[i].uid) {
                users[i].name = data.name
                return JSON.stringify({
                    meta: {
                        status: 200,
                        msg: '修改完成！'
                    }
                })
            }
        }
        return JSON.stringify({
            meta: {
                status: 999,
                msg: '修改失败，请稍后再试！'
            }
        })
    },

    // 修改个人头像
    changeHeadPortrait: option => {
        let data = JSON.parse(option.body)
        NProgress.done()
        for (let i in users) {
            if (data.uid === users[i].uid) {
                users[i].headPortrait = data.headPortrait
                return JSON.stringify({
                    meta: {
                        status: 200,
                        msg: '修改完成！'
                    }
                })
            }
        }
        return JSON.stringify({
            meta: {
                status: 999,
                msg: '修改失败，请稍后再试！'
            }
        })
    },
}