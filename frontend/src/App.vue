<script setup lang="ts">
 import Example from './components/Example.vue'
 import ExampleTable from './components/ExampleTable.vue'
 import Organizations from './components/Organizations.vue'
</script>

<template>
    <div class="card">
	<TabView>
            <TabPanel header="Home">
		<p>
		    Hello! Here is an example:<br />
		    <Example></Example><br />
		    And here is a nice table!<br />
		    <ExampleTable></ExampleTable>
		</p>
	    </TabPanel>
	    <TabPanel header="Organizations">
		<p>
		    <Organizations></Organizations>
		</p>
            </TabPanel>
            <TabPanel header="Contact">
		<p>
		    TBD
		</p>
            </TabPanel>
	</TabView>
    </div>

</template>

<style scoped></style>
