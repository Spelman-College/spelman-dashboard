<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
</script>

<script lang="ts">
export default {
    data() {
        return {
            headers: [
                {
                    title: "Date",
                    key: "date"
                },
                {
                    title: "Rainfall",
                    key: "value"
                }
            ],
            tableItems: []
        }
    },
    methods: {
        async getData() {
            // This uses DataCommons' public API key. DO NOT INCLUDE A PRIVATE API KEY HERE!
            const res = await fetch("https://api.datacommons.org/v1/observations/series/wikidataId/Q987/Mean_Rainfall?key=AIzaSyCTI4Xz-UW_G2Q2RfknhcfdAnTHq5X5XuI");
            const finalRes = await res.json();
            this.tableItems = finalRes.observations;

            this.headers[1].title = "Rainfall (" + finalRes.facet.unit + ")";
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<template>
    <v-data-table items-per-page="10" :headers="headers" :items="tableItems"></v-data-table>
</template>