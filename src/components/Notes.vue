<script setup lang="ts">
	import { NCard, NTabs, NTabPane, NGrid, NGridItem } from "naive-ui";
	import NotesTab from "./NotesTab.vue";

	import { useNotesStore } from "@/store/notes";
	const store = useNotesStore();
</script>

<template>
	<NCard>
		<NTabs type="line" animated defaultValue="today">
			<NTabPane v-for="tab in store.state" :name="tab.name" :tab="tab.name">
				<NotesTab :tabName="tab.name"></NotesTab>
			</NTabPane>
		</NTabs>
	</NCard>
</template>
