import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'

import SpeedDial from 'primevue/speeddial';

const app = createApp(App)
app.use(PrimeVue)
app.component('SpeedDial', SpeedDial)
app.mount('#app')