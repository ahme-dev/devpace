<script setup lang="ts">
	import { NTimeline, NTimelineItem } from "naive-ui";

	import { usePomodoroStore } from "@/store/pomodoro";
	const store = usePomodoroStore();
</script>

<template>
	<div style="">
		<NTimeline>
			<NTimelineItem
				type="success"
				v-for="s in store.history"
				:title="`${s.duration.toString()} mins`"
				:content="`${s.stages.length / 2} round(s)`"
				:time="s.date"
			/>
		</NTimeline>
	</div>
</template>
