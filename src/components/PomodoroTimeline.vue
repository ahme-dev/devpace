<script setup lang="ts">
	import {
		NButton,
		NIcon,
		NTimeline,
		NTimelineItem,
		NTooltip,
		useMessage,
	} from "naive-ui";
	import { ClearAllFilled } from "@vicons/material";
	import { usePomodoroStore } from "@/store/pomodoro";
	import { getTimeString } from "@/store/utils";
	import { useMainStore } from "@/store/main";
	const store = usePomodoroStore();
	const mainStore = useMainStore();

	const message = useMessage();

	const clearHistory = () => {
		if (store.clearHistory()) message.warning("Session history cleared");
		else message.info("Session history is already empty");
	};
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
				:time="
					s.date.day +
					' at ' +
					getTimeString(
						mainStore.twentyFourHours,
						s.date.time.hours,
						s.date.time.minutes
					)
				"
			/>

			<NTooltip trigger="hover">
				<template #trigger>
					<NButton circle @click="clearHistory()">
						<template #icon>
							<NIcon>
								<ClearAllFilled />
							</NIcon>
						</template>
					</NButton>
				</template>
				Clear session history
			</NTooltip>
		</NTimeline>
	</div>
</template>
