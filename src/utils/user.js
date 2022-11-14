import fetch from "./fetch"

export function loginByPassApi(data) {
    return fetch({
        method: "post",
        url: "/login/pass",
        data
    })
}

export function loginByCodeApi(data) {
    return fetch({
        method: "post",
        url: "/login/code",
        data
    })
}

export function getUserInfoApi() {
    return fetch({
        method: "post",
        url: "/get/user/info",
    })
}

export function logoutApi(data) {
    return fetch({
        method: "post",
        url: "/logout",
        data
    })
}