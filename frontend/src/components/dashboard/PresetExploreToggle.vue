<script setup lang="ts">
 import { ref, watchEffect, watch } from 'vue'
 import { useRouter } from 'vue-router';

 const router = useRouter()

 const emit = defineEmits(['changeView'])
 const props = defineProps(['view'])

 if (!['preset', 'explore'].includes(props.view)) {
     console.log('found unknown view', props.view)
 }

 let exploreSelected = false
 if (props.view == 'explore') {
     exploreSelected = true
 }
 const exploreDataActive = ref(exploreSelected)

 watch(exploreDataActive, () => {
     if (exploreDataActive.value) {
	 emit('changeView', 'explore')
     } else {
	 emit('changeView', 'preset')
     }
 })

</script>

<template>
    <div class="button-group">
	<button :class="exploreDataActive ? 'active' : ''" @click="exploreDataActive = true">
	    <span v-if="exploreDataActive">&checkmark;</span>
	    Explore&nbsp;data
	</button>
	<button :class="!exploreDataActive ? 'active' : ''" @click="exploreDataActive = false">
	    <span v-if="!exploreDataActive">&checkmark;</span>
	    Review charts
	</button>
    </div>
</template>


<style scoped>
 .button-group {
     padding: 1rem;
     display: flex;
     justify-content: space-between;
     white-space:nowrap;
 }
.button-group>button {
  border: 1px solid #e8eaed;
  font-family: 'Noto Sans Mono';
  font-size: 1rem;
  font-weight: 700;
  background: #444c57;
  color: #ffffff;

}

.button-group>button:hover {
  background: #6f7987;
}

.button-group>button.active {
  background: #4FDFFF;
  color: #000000;
}

.button-group>button:first-child {
  border-radius: 6.25rem 0rem 0rem 6.25rem;
}

.button-group>button:last-child {
  border-radius: 0rem 6.25rem 6.25rem 0rem;
}
</style>
