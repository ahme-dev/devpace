<script setup lang="ts">
	import { NSpace, NTimeline, NTimelineItem } from "naive-ui";

	import { usePomodoroStore } from "@/store/pomodoro";
	const store = usePomodoroStore();
</script>

<template>
	<NSpace justify="center" style="overflow: auto">
		<NTimeline>
			<NTimelineItem
				type="success"
				v-for="s in store.history"
				:title="`${s.duration.toString()} mins`"
				:content="`${s.stages.length / 2} round(s)`"
				:time="s.date"
			/>
		</NTimeline>
	</NSpace>
</template>
