<script setup lang="ts">
	import { PlusFilled } from "@vicons/material";
	import { NList, NListItem, NButton, NText, NInput, NIcon } from "naive-ui";
	import type { Tabs } from "@/store/notes";

	import { useNotesStore } from "@/store/notes";
	import { defineProps } from "vue";

	const props = defineProps<{ tabName: Tabs }>();

	// get data from store based on type of pane
	const store = useNotesStore();
	let tab = store.getState(props.tabName);
</script>

<template>
	<!-- when there's data -->
	<NList v-if="tab.notes.length">
		<NListItem v-for="item in tab.notes">
			<NInput
				type="textarea"
				:autosize="{
					maxRows: 5,
				}"
				v-model:value="item.title"
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
	<NButton style="margin-top: 1rem">
		<template #icon>
			<NIcon>
				<PlusFilled></PlusFilled>
			</NIcon>
		</template>
		Add
	</NButton>
</template>
