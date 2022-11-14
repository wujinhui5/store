import Mock from "mockjs"
import userApi from "./js/user"
import shopApi from "./js/shop"

let base = "http://127.0.0.1:8081"
Mock.mock(base + "/login/pass", "post", userApi.loginByPass)
Mock.mock(base + "/login/code", "post", userApi.loginByCode)
Mock.mock(base + "/logout", "post", userApi.logout)
Mock.mock(base + "/get/user/info", "post", userApi.getInfo)


Mock.mock(base + "/get/shop/info", "post", shopApi.getShopInfo)
Mock.mock(base + "/get/shops", "post", shopApi.getShops)
Mock.mock(base + "/get/shop/sort", "post", shopApi.getShopSort)
Mock.mock(base + "/get/slide", "post", shopApi.getSlideData)
Mock.mock(base + "/get/shop/car", "post", shopApi.getShopCar)
Mock.mock(base + "/get/shop/delete", "post", shopApi.deleteShop)
Mock.mock(base + "/get/shop/add", "post", shopApi.addToShopCar)
Mock.mock(base + "/get/settle", "post", shopApi.settleAcount)
Mock.mock(base + "/get/order", "post", shopApi.getOrder)
Mock.mock(base + "/order/confirm", "post", shopApi.confirmReceipt)
Mock.mock(base + "/order/refund", "post", shopApi.cancelOrder)
Mock.mock(base + "/order/cancal/refund", "post", shopApi.cancelRefund)

