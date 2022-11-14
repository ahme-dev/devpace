<script setup lang="ts">
	import { PlusFilled } from "@vicons/material";
	import { NList, NListItem, NButton, NText, NIcon } from "naive-ui";

	import { useNotesStore } from "@/store/notes";
	import { defineProps } from "vue";

	const props = defineProps<{ tabName: string }>();

	// get data from store based on type of pane
	const store = useNotesStore();
	let data =
		props.tabName == "today"
			? store.state.today
			: props.tabName == "yesterday"
			? store.state.yesterday
			: store.state.tomorrow;

	// item was clicked
	const itemClicked = (id: number) => {
		store.ui.onNote = id;
		console.log(id);
	};
</script>

<template>
	<!-- when there's data -->
	<NList clickable hoverable v-if="data.length">
		<NListItem v-for="(item, id) in data" @click="itemClicked(id)">
			<NText>{{ item }}</NText>
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
