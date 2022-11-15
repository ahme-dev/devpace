<script setup lang="ts">
	import { PlusFilled } from "@vicons/material";
	import { NList, NListItem, NButton, NText, NInput, NIcon } from "naive-ui";
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
	<NList v-if="day.notes.length">
		<NListItem v-for="(item, id) in day.notes">
			<NInput
				type="textarea"
				:autosize="{
					maxRows: 5,
				}"
				@blur="store.cleanInDay(day)"
				show-count
				placeholder="write something"
				v-model:value="day.notes[id]"
			></NInput>
		</NListItem>
	</NList>

	<!-- no data -->
	<NList v-else>
		<NListItem>
			<NText> Nothing to show! </NText>
		</NListItem>
	</NList>

	<!-- add button -->
	<NButton @click="store.insertInDay(day)" style="margin-top: 1rem">
		<template #icon>
			<NIcon>
				<PlusFilled></PlusFilled>
			</NIcon>
		</template>
		Add
	</NButton>
</template>
