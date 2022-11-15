<script setup lang="ts">
	import { NCard, NTabs, NTabPane } from "naive-ui";
	import NotesDay from "./NotesDay.vue";

	import { useNotesStore } from "@/store/notes";
	const store = useNotesStore();
</script>

<template>
	<NCard>
		<NTabs
			type="bar"
			tabStyle="padding-top: 0rem; margin-top: 0rem"
			animated
			defaultValue="today"
		>
			<NTabPane v-for="day in store.days" :name="day.name" :tab="day.name">
				<NotesDay :dayName="day.name"></NotesDay>
			</NTabPane>
		</NTabs>
	</NCard>
</template>
