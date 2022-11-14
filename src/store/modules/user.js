import Cookies from "js-cookie"
import Cookie from "js-cookie"
import { loginByCodeApi, loginByPassApi, getUserInfoApi, logoutApi } from "../../utils/user"

export default {
    namespaced: true,
    state: {
        phone: '',
        uid: '',
        shopCarNum: 0,
        name: '',
        headPortrait: '',
        token: Cookie.get('token')
    },
    mutations: {
        SET_PHONE(state, val) {
            state.phone = val
        },

        SET_UID(state, val) {
            state.uid = val
        },

        SET_NAME(state, val) {
            state.name = val
        },

        SET_HEADPORTRAIT(state, val) {
            state.headPortrait = val
        },

        SET_TOKEN(state, val) {
            state.token = val
        },

        SET_SHOPCARNUM(state, val) {
            state.shopCarNum = val
        }
    },
    actions: {
        // 密码登录 
        loginByPass({ commit }, data) {
            return new Promise((resolve, reject) => {
                loginByPassApi(data).then(res => {
                    let data = JSON.parse(res.data)
                    if (data.meta.status != 200) {
                        reject(data.meta.msg)
                        return
                    }
                    Cookie.set('token', data.data.token)
                    commit("SET_TOKEN", data.data.token)
                    resolve(data.meta.msg)
                }).catch(err => {
                    console.log(err)
                })
            })
        },

        // 验证码登录
        loginByCode({ commit }, data) {
            return new Promise((resolve, reject) => {
                loginByCodeApi(data).then(res => {
                    let data = JSON.parse(res.data)
                    if (data.meta.status != 200) {
                        reject(data.meta)
                        return
                    }
                    Cookie.set('token', data.data.token)
                    commit("SET_TOKEN", data.data.token)
                    resolve(data.meta.msg)
                }).catch(err => {
                    console.log(err)
                })
            })
        },

        // 获取用户信息
        getUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfoApi().then(res => {
                    let data = JSON.parse(res.data)
                    if (data.meta.status === 200) {
                        commit('SET_UID', data.data.uid)
                        commit('SET_NAME', data.data.name)
                        commit('SET_PHONE', data.data.phone)
                        commit('SET_HEADPORTRAIT', data.data.headPortrait)
                        commit("SET_SHOPCARNUM", data.data.shopCarNum)
                        resolve(data.meta.msg)
                    } else {
                        reject(data.meta.msg)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },

        // 退出登录
        logout({ state, commit }) {
            new Promise((resolve, reject) => {
                logoutApi(state.phone).then(res => {
                    let resData = JSON.parse(res.data)
                    if (resData.meta.status === 200) {
                        commit('SET_UID', '')
                        commit('SET_NAME', '')
                        commit('SET_PHONE', '')
                        commit('SET_HEADPORTRAIT', '')
                        commit("SET_SHOPCARNUM", 0)
                        Cookies.remove("token")
                        resolve(resData.meta.msg)
                    } else {
                        reject(resData.meta.msg)
                    }
                })
            }).catch(err => console.log(err))

        }
    }
}