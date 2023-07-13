import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'

import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Skeleton from 'primevue/skeleton';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Tree from 'primevue/tree';
import RadioButton from 'primevue/radiobutton';


const app = createApp(App)
app.use(PrimeVue)
app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Skeleton', Skeleton)
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('Tree', Tree)
app.component('RadioButton', RadioButton)
app.mount('#app')
