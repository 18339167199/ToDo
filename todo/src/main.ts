import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// common style
import './assets/styles/index.scss'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import registerIcon from './utils/elementPlusIcon'

const app = createApp(App)
registerIcon(app)
app.use(store).use(router).use(ElementPlus, { size: 'small', zIndex: 1000 })
app.mount('#app')
