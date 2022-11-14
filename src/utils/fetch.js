import axios from "axios"
import cookie from "js-cookie"

let service = axios.create({
    baseURL: "http://127.0.0.1:8081/",
    timeout: 5000
})

service.defaults.headers.common['authorization'] = cookie.get('token')

export default service