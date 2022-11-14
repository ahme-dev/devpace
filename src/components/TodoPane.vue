<script setup lang="ts">
	import { PlusFilled } from "@vicons/material";
	import { NList, NListItem, NButton, NText, NIcon } from "naive-ui";

	import { useTodoStore } from "@/store/todo";
	import { defineProps } from "vue";

	// get props
	const props = defineProps<{ type: string }>();

	// get data from store based on type of pane
	const store = useTodoStore();
	let data = props.type === "today" ? store.state.today : store.state.tomorrow;
</script>

<template>
	<!-- show data -->
	<NList hoverable clickable>
		<!-- when there's data -->
		<template v-if="data.length">
			<NListItem v-for="(item, id) in data">
				<NText>{{ item }}</NText>
			</NListItem>
		</template>

		<!-- when there's no data -->
		<template v-else>
			<NListItem>
				<NText> Nothing to show! </NText>
			</NListItem>
		</template>
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
