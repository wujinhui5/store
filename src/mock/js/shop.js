import cookie from "js-cookie"
import users from "../json/users"
import shops from "../json/shops"
import shopSort from "../json/shopSort"
import slide from "../json/slide"
import shopCar from "../json/shopCar"
import order from "../json/order"
import nprogress from "nprogress"

// 商品详情页加载商品图片
function loadPic(shopId) {
    let pics = shops[shopId].shopPic
    let picUrls = []
    pics.forEach(i => {
        picUrls.push(require(`@/mock/imags/shops/${shopId}/${i}`))
    })
    return picUrls
}

// 验证用户与登录状态
function verifyUser(phone) {
    if (!users[phone] || users[phone].token != cookie.get("token")) {
        return JSON.stringify({
            meta: {
                msg: "登录状态失效，请重新登录",
                status: 999
            }
        })
    }
    return 0
}

// 提取用户基本信息
function extractUserBaseInfo(list) {
    let result = []
    list.forEach(i => {
        let data = JSON.parse(JSON.stringify(shops[i.shopId]))
        data.num = i.num
        data.imgUrl = require(`@/mock/imags/shops/${i.shopId}/${data.shopPic[0]}`)
        delete data.label
        delete data.shopPic
        result.push(data)
    })
    return result
}

// 获取当前时间
function getTime() {
    var time = new Date();
    var d = time.getDate();
    d = d < 10 ? "0" + d : d;
    var h = time.getHours();
    h = h < 10 ? "0" + h : h;
    var m = time.getMinutes();
    m = m < 10 ? "0" + m : m;
    var s = time.getSeconds();
    s = s < 10 ? "0" + s : s;
    return `${time.getFullYear()}-${time.getMonth() + 1}-${d} ${h}:${m}:${s}`
}

let orderCode = 20000000

export default {
    // 主页获取商品
    getShops: () => {
        let response = []
        for (let i of shopSort) {
            if (i.shops != false) {
                let result = []
                i.shops.forEach(j => {
                    let data = JSON.parse(JSON.stringify(shops[j]))
                    data.imgUrl = require(`@/mock/imags/shops/${j}/${data.shopPic[0]}`)
                    delete data.label
                    delete data.shopPic
                    result.push(data)
                })
                let temp = JSON.parse(JSON.stringify(i))
                temp.data = result
                delete temp.shops
                response.push(temp)
            }
        }

        nprogress.done()
        return JSON.stringify({
            meta: {
                msg: "获取成功",
                status: 200
            },
            data: response,
        })
    },
    // 获取商品页信息
    getShopInfo: option => {
        let data = JSON.parse(option.body)
        let shopId = data.shopId
        nprogress.done()
        if (shopId in shops) {
            let data = JSON.parse(JSON.stringify(shops[shopId]))
            delete data.label
            data.shopImgUrls = loadPic(shopId)
            return JSON.stringify({
                meta: {
                    msg: "获取成功",
                    status: 200
                },
                data
            })
        }
        return JSON.stringify({
            meta: {
                msg: "商品不存在",
                status: 999
            }
        })
    },

    // 获取商品分类
    getShopSort: option => {
        let index = parseInt(JSON.parse(option.body).index)
        nprogress.done()
        if (!index && index != 0 || index < 0 || index > 15) {
            return JSON.stringify({
                meta: {
                    msg: "商品分类不存在",
                    status: 999
                }
            })
        }
        let result = shopSort[index].sort
        return JSON.stringify({
            meta: {
                msg: "获取成功！",
                status: 200
            },
            data: result
        })
    },

    // 获取轮播图
    getSlideData: () => {
        for (let i of slide) i.imgUrl = require(`@/mock/imags/slide/${i.img}`)
        nprogress.done()
        return JSON.stringify({
            meta: {
                msg: "获取成功",
                status: 200
            },
            data: slide,
        })
    },

    // 获取购物车商品
    getShopCar: option => {
        let phone = JSON.parse(option.body).phone
        // 验证用户
        let verifyData = verifyUser(phone)
        nprogress.done()
        if (verifyData) return verifyData
        // 整理数据
        let result = []
        let targetShops = shopCar[phone]
        for (let k in targetShops) {
            let temp = []
            let i = temp.indexOf(shops[k].storeId)
            if (i != -1) {
                result[i].data.push(targetShops[k])
            } else {
                result.push({
                    storeId: shops[k].storeId,
                    storeName: shops[k].storeName,
                    data: [targetShops[k]]
                })
                temp.push(shops[k].storeId)
            }
        }
        result.forEach(i => {
            i.data = extractUserBaseInfo(i.data)
        })
        return JSON.stringify({
            meta: {
                msg: "获取成功",
                status: 200
            },
            data: result,
        })
    },

    // 删除购物车内商品
    deleteShop: option => {
        let reqData = JSON.parse(option.body)
        let phone = reqData.phone
        let shopId = reqData.shopId
        let verifyData = verifyUser(phone)
        nprogress.done()
        if (verifyData) return verifyData
        let result = 0
        shopId.forEach(i => {
            if (shopCar[phone][i]) {
                delete shopCar[phone][i]
                result++
            }
        })
        users[phone].shopCarNum = users[phone].shopCarNum - result
        if (result === shopId.length) {
            return JSON.stringify({
                meta: {
                    msg: "删除成功！",
                    status: 200
                },
                data: users[phone].shopCarNum
            })
        }
        return JSON.stringify({
            meta: {
                msg: "购物车商品列表出错！",
                status: 998
            },
            data: users[phone].shopCarNum
        })
    },

    // 加入购物车
    addToShopCar: option => {
        let reqData = JSON.parse(option.body)
        let phone = reqData.phone
        let shopId = reqData.shopId
        let num = reqData.num
        // 验证用户
        let verifyData = verifyUser(phone)
        nprogress.done()
        if (verifyData) return verifyData

        if (!shops[shopId]) {
            return JSON.stringify({
                meta: {
                    msg: "商品不存在！",
                    status: 998
                }
            })
        }
        if (shopCar[phone][shopId]) {
            return JSON.stringify({
                meta: {
                    msg: "当前商品已经在购物车中！",
                    status: 200
                }
            })
        }
        shopCar[phone][shopId] = { shopId, num }
        users[phone].shopCarNum++
        return JSON.stringify({
            meta: {
                msg: "加入购物车成功！",
                status: 200
            },
            data: users[phone].shopCarNum
        })
    },

    // 结算
    settleAcount: option => {
        let reqData = JSON.parse(option.body)
        let phone = reqData.phone
        let shopId = reqData.shopId
        let num = reqData.num
        // 验证用户
        let verifyData = verifyUser(phone)
        nprogress.done()
        if (verifyData) return verifyData

        // 生成订单数据
        let time = getTime()
        shopId.forEach((ite, idx) => {
            order[phone].uncompleted.unshift({
                shopId: ite,
                num: num[idx],
                type: "uncompleted",
                price: num[idx] * shops[ite].price,
                time,
                code: String(orderCode),
                consignee: users[phone].name
            })
            delete shopCar[phone][ite]
            orderCode++
        })
        users[phone].shopCarNum = users[phone].shopCarNum - shopId.length

        return JSON.stringify({
            meta: {
                msg: "加入购物车成功！",
                status: 200
            },
            data: users[phone].shopCarNum
        })
    },

    // 获取订单信息
    getOrder: option => {
        let reqData = JSON.parse(option.body)
        let phone = reqData.phone
        let type = reqData.type
        // 验证用户
        let verifyData = verifyUser(phone)
        nprogress.done()
        if (verifyData) return verifyData

        if (!order[phone][type] && type != "all") {
            return JSON.stringify({
                meta: {
                    msg: "获取失败！",
                    status: 998
                }
            })
        }
        let result = []
        if (type === "all") {
            result = JSON.parse(JSON.stringify([
                ...order[phone]["uncompleted"],
                ...order[phone]["completed"],
                ...order[phone]["refunding"],
            ]))
            result = result.sort((a, b) => {
                if (a.code > b.code) return -1
                else if (a.code < b.code) return 1
            })
        } else {
            result = JSON.parse(JSON.stringify(order[phone][type]))
        }
        result.forEach(i => {
            let shopId = i.shopId
            i.storeId = shops[shopId].storeId
            i.storeName = shops[shopId].storeName
            i.title = shops[shopId].title
            i.imgUrl = require(`@/mock/imags/shops/${shopId}/${shops[shopId].shopPic[0]}`)
        })
        return JSON.stringify({
            meta: {
                msg: "获取成功！",
                status: 200
            },
            data: result
        })
    },

    // 确认收货
    confirmReceipt: option => {
        let reqData = JSON.parse(option.body)
        let phone = reqData.phone
        let shopId = reqData.shopId
        // 验证用户
        let verifyData = verifyUser(phone)
        nprogress.done()
        if (verifyData) return verifyData

        let temp = order[phone]["uncompleted"]
        for (let i in temp) {
            if (temp[i].shopId === shopId) {
                temp[i].type = "completed"
                order[phone]["completed"].unshift(temp[i])
                temp.splice(i, 1)
                return JSON.stringify({
                    meta: {
                        msg: "确认收货成功！",
                        status: 200
                    }
                })
            }
        }

    },

    // 取消订单
    cancelOrder: option => {
        let reqData = JSON.parse(option.body)
        let phone = reqData.phone
        let shopId = reqData.shopId
        // 验证用户
        let verifyData = verifyUser(phone)
        nprogress.done()
        if (verifyData) return verifyData

        let temp = order[phone]["uncompleted"]
        for (let i in temp) {
            if (temp[i].shopId === shopId) {
                temp[i].type = "refunding"
                order[phone]["refunding"].unshift(temp[i])
                temp.splice(i, 1)
                return JSON.stringify({
                    meta: {
                        msg: "取消订单成功，等待商家退款！",
                        status: 200
                    }
                })
            }
        }
    },

    // 取消退款
    cancelRefund: option => {
        let reqData = JSON.parse(option.body)
        let phone = reqData.phone
        let shopId = reqData.shopId
        // 验证用户
        let verifyData = verifyUser(phone)
        nprogress.done()
        if (verifyData) return verifyData

        let temp = order[phone]["refunding"]
        for (let i in temp) {
            if (temp[i].shopId === shopId) {
                temp[i].type = "uncompleted"
                order[phone]["uncompleted"].unshift(temp[i])
                temp.splice(i, 1)
                return JSON.stringify({
                    meta: {
                        msg: "取消退款成功！",
                        status: 200
                    }
                })
            }
        }
    }
}