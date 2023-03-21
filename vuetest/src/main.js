import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import router from './router'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Button from "primevue/button"
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import "bootstrap/dist/js/bootstrap.js"



createApp(App)
    .use(router)
    .use(PrimeVue)
    .component('Button', Button)
    .component('Toast', Toast)
    .use(ToastService)
    .mount('#app')


