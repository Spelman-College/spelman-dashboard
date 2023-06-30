import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'

import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Skeleton from 'primevue/skeleton';

const app = createApp(App)
app.use(PrimeVue)
app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Skeleton', Skeleton)
app.mount('#app')