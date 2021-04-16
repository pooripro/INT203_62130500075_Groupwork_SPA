import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import navbar from './components/navbar.vue'

// createApp(App).use(router).mount('#app')

const app = createApp(App)
app.use(router)
app.component('nav-bar', navbar)

app.mount('#app')
