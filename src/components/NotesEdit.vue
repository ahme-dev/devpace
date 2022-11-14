<script setup lang="ts">
	import { NInput, NCard, NSpace } from "naive-ui";

	import { useNotesStore } from "@/store/notes";

	// get data from tab
	const store = useNotesStore();
	let data =
		store.ui.onTab == "today"
			? store.state.today
			: store.ui.onTab == "yesterday"
			? store.state.yesterday
			: store.state.tomorrow;
</script>

<template>
	<NCard>
		<NInput v-model:value="data[store.ui.onNote]"></NInput>
		<NInput type="textarea"></NInput>
	</NCard>
</template>
