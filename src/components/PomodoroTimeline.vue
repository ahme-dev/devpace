<script setup lang="ts">
	import { NTimeline, NTimelineItem } from "naive-ui";
	import { usePomodoroStore } from "@/store/pomodoro";
	const store = usePomodoroStore();
</script>

<template>
	<div style="display: flex; align-items: flex-end; justify-content: flex-end">
		<NTimeline style="display: flex; flex-direction: column">
			<NTimelineItem
				v-if="store.history.length === 0"
				title="No sessions"
				time="No previous sessions done"
			/>

			<NTimelineItem
				type="success"
				v-else
				v-for="s in store.history"
				:title="`${s.duration.minutes} mins`"
				:content="`${s.stages.length / 2} round(s)`"
				:time="s.date.day + ' at ' + s.date.time"
			/>
		</NTimeline>
	</div>
</template>
