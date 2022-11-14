<script setup lang="ts">
	import { NCard, NTabs, NTabPane } from "naive-ui";
	import NotesTab from "./NotesTab.vue";
</script>

<template>
	<NCard>
		<NTabs type="line" animated defaultValue="today">
			<NTabPane
				v-for="tabName in ['yesterday', 'today', 'tomorrow']"
				:name="tabName"
				:tab="tabName"
			>
				<NotesTab :tab-name="tabName"></NotesTab>
			</NTabPane>
		</NTabs>
	</NCard>
</template>
