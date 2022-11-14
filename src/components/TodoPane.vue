<script setup lang="ts">
	import { PlusFilled } from "@vicons/material";
	import { NList, NListItem, NButton, NText, NInput, NIcon } from "naive-ui";

	import { useTodoStore } from "@/store/todo";
	import { defineProps } from "vue";

	// get props
	const props = defineProps<{ paneName: string }>();

	// get data from store based on type of pane
	const store = useTodoStore();
	let data = props.paneName === "today" ? store.today : store.tomorrow;
</script>

<template>
	<!-- when there's data -->
	<NList clickable hoverable v-if="data.length">
		<NListItem v-for="(item, id) in data">
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
