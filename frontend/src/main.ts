import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './router'

import Button from 'primevue/button';
import Card from 'primevue/card';
import Carousel from 'primevue/carousel';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import RadioButton from 'primevue/radiobutton';
import MultiSelect from 'primevue/multiselect';
import Multiselect from 'vue-multiselect'
import Dropdown from 'primevue/dropdown';
import ToggleButton from 'primevue/togglebutton'
import Skeleton from 'primevue/skeleton';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import Tree from 'primevue/tree';
import VueGtag from "vue-gtag";

const app = createApp(App)
app.use(PrimeVue)
app.use(router)
app.component('Button', Button)
app.component('Card', Card)
app.component('Carousel', Carousel)
app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('RadioButton', RadioButton)
app.component('MultiSelect', MultiSelect)
app.component('Multiselect', Multiselect)
app.component('Dropdown', Dropdown)
app.component('ToggleButton', ToggleButton)
app.component('Skeleton', Skeleton)
app.component('TabPanel', TabPanel)
app.component('TabView', TabView)
app.component('Tree', Tree)
app.use(VueGtag, {
  config: { id: "G-30X50JL2XS" }
})
app.mount('#app')
