import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {

        }
    }
})

createApp(App).use(store).use(router).mount('#app')
