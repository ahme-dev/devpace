<script setup lang="ts">
	import { NSpace, NTimeline, NTimelineItem } from "naive-ui";

	import { usePomodoroStore } from "@/store/pomodoro";
	const store = usePomodoroStore();
</script>

<template>
	<NSpace justify="center" style="overflow: auto">
		<NTimeline>
			<NTimelineItem v-for="s in store.history" :content="s.at.toString()" />
		</NTimeline>
	</NSpace>
</template>
