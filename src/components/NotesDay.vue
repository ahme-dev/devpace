<script setup lang="ts">
	import { NList, NListItem, NText, NInput, NScrollbar } from "naive-ui";
	import type { Days } from "@/store/notes";

	import { useNotesStore } from "@/store/notes";
	import { defineProps } from "vue";

	const props = defineProps<{ dayName: Days }>();

	// get data from store based on type of pane
	const store = useNotesStore();
	let day = store.getDay(props.dayName);
</script>

<template>
	<!-- when there's data -->
	<NScrollbar
		v-if="day.notes.length"
		style="max-height: 50vh; padding-right: 1rem"
	>
		<NList>
			<NListItem v-for="(item, id) in day.notes">
				<NInput
					type="textarea"
					:autosize="{
						maxRows: 5,
					}"
					show-count
					placeholder="write something"
					v-model:value="day.notes[id]"
				></NInput>
			</NListItem>
		</NList>
	</NScrollbar>

	<!-- no data -->
	<NList v-else>
		<NListItem>
			<NInput
				type="textarea"
				placeholder="Nothing to show"
				:autosize="{
					maxRows: 2,
				}"
				:disabled="true"
				style="background-color: transparent"
			/>
		</NListItem>
	</NList>
</template>
