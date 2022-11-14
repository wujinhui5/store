import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import "./mock"
import "./modules/routerBefore"
import "./assets/css/base.css"

createApp(App).use(router).use(store).mount('#app')