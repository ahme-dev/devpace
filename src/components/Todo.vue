<script setup lang="ts">
	import { NCard, NTabs, NTabPane } from "naive-ui";
	import TodoPane from "./TodoPane.vue";

	import { useTodoStore } from "@/store/todo";
	const store = useTodoStore();
	const tabs = Object.keys(store.state);
</script>

<template>
	<NCard>
		<NTabs type="line" animated>
			<NTabPane v-for="type in tabs" :name="type" :tab="type">
				<TodoPane :type="type"></TodoPane>
			</NTabPane>
		</NTabs>
	</NCard>
</template>
