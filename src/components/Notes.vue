<script setup lang="ts">
	import { useNotesStore } from "@/store/notes";
	import { NCard, NTabs, NTabPane } from "naive-ui";
	import NotesTab from "./NotesTab.vue";

	const store = useNotesStore();

	// get all tabs
	const tabs = Object.keys(store.state);

	// when a tab is changed
	const changeTab = (name: string) => {
		store.ui.onTab = name;
		return true;
	};
</script>

<template>
	<NCard>
		<NTabs @beforeLeave="changeTab" type="line" animated defaultValue="today">
			<NTabPane v-for="tabName in tabs" :name="tabName" :tab="tabName">
				<NotesTab :tab-name="tabName"></NotesTab>
			</NTabPane>
		</NTabs>
	</NCard>
</template>
