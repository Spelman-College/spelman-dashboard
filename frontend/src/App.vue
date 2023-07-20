<script setup lang="ts">
  import { ref, onMounted } from 'vue';
 import Example from './components/Example.vue'
 import ExampleTable from './components/ExampleTable.vue'
 import Organizations from './components/Organizations.vue'
 import DataDashboard from './components/DataDashboard.vue'
 import Women from './components/Women.vue'
 import "../node_modules/primeflex/primeflex.css"

 // Holds the active tab index
 const active = ref(0);

 // Mapping anchor links to tabs
 const name2index = {
     "#home": 0,
     "#organizations": 1,
     "#women": 2,
     "#data": 3
 }
 const index2name = {
     0: "home",
     1: "organizations",
     2: "women",
     3: "data"
 }

 // A callback fired on a TabView tab change. Update the anchor text.
 const tabChange = (event) =>  {
     window.location.hash = index2name[event.index]
 }

 onMounted(() => {
     if (window.location.hash === '') {
	 active.value = 0
	 return
     }
     const cur = name2index[window.location.hash]
     if (cur === undefined) {
	 active.value = 0
     } else {
	 active.value = cur
     }
 });
</script>

<template>
    <div class="card">
	<TabView v-model:activeIndex="active" @tab-change="tabChange">
            <TabPanel header="Home" >
		<p>
		    Hello! Use the tabs above to navigate through the demo.
		</p>
	    </TabPanel>
	    <TabPanel header="Organizations" >
		<p>
		    <Organizations></Organizations>
		</p>
            </TabPanel>

	    <TabPanel header="Women">
 		<Women></Women>
            </TabPanel>
      <TabPanel header="Data Dashboard">      
		<p>
		    <DataDashboard></DataDashboard>
		</p>
            </TabPanel>
            

	</TabView>
    </div>

</template>

<style scoped></style>
