import fetch from "./fetch"

export function getShopInfoApi(data) {
    return fetch({
        method: "post",
        url: "/get/shop/info",
        data
    })
}

export function getShopsApi() {
    return fetch({
        method: "post",
        url: "/get/shops",
    })
}

export function getShopSortApi(data) {
    return fetch({
        method: "post",
        url: "/get/shop/sort",
        data
    })
}

export function getSlideDataApi() {
    return fetch({
        method: "post",
        url: "/get/slide",
    })
}

export function getShopCarApi(data) {
    return fetch({
        method: "post",
        url: "/get/shop/car",
        data
    })
}

export function deleteShopApi(data) {
    return fetch({
        method: "post",
        url: "/get/shop/delete",
        data
    })
}

export function addToShopCarApi(data) {
    return fetch({
        method: "post",
        url: "/get/shop/add",
        data
    })
}

export function settleAccountApi(data) {
    return fetch({
        method: "post",
        url: "/get/settle",
        data
    })
}

export function getOrderApi(data) {
    return fetch({
        method: "post",
        url: "/get/order",
        data
    })
}

export function confirmReceiptApi(data) {
    return fetch({
        method: "post",
        url: "/order/confirm",
        data
    })
}

export function cancalOrderApi(data) {
    return fetch({
        method: "post",
        url: "/order/refund",
        data
    })
}

export function cancalRefundApi(data) {
    return fetch({
        method: "post",
        url: "/order/cancal/refund",
        data
    })
}
