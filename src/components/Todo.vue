<script setup lang="ts">
	import { NCard, NTabs, NTabPane } from "naive-ui";
	import TodoSection from "./TodoSection.vue";

	import { useMainStore } from "@/store";
	const store = useMainStore();
</script>

<template>
	<NCard>
		<NTabs type="line" animated>
			<!-- today -->
			<NTabPane name="today" tab="Today">
				<TodoSection :data="store.todo.today"></TodoSection>
			</NTabPane>

			<!-- tomorrow -->
			<NTabPane name="tomorrow" tab="Tomorrow">
				<TodoSection :data="store.todo.tomorrow"></TodoSection>
			</NTabPane>
		</NTabs>
	</NCard>
</template>
