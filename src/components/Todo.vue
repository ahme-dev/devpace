<script setup lang="ts">
	import { NCard, NTabs, NTabPane } from "naive-ui";
	import TodoPane from "./TodoPane.vue";
</script>

<template>
	<NCard>
		<NTabs type="line" animated>
			<NTabPane
				v-for="paneName in ['today', 'tomorrow']"
				:name="paneName"
				:tab="paneName"
			>
				<TodoPane :pane-name="paneName"></TodoPane>
			</NTabPane>
		</NTabs>
	</NCard>
</template>
