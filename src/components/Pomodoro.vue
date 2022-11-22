<script setup lang="ts">
	import { PlayArrowFilled, PauseFilled } from "@vicons/material";
	import {
		NCard,
		NText,
		NSpace,
		NGrid,
		NGridItem,
		NTimeline,
		NTimelineItem,
		NButton,
		NIcon,
		NStatistic,
		NNumberAnimation,
		NCountdown,
		NGradientText,
	} from "naive-ui";

	import PomodoroItem from "./PomodoroItem.vue";
	import PomodoroTimeline from "./PomodoroTimeline.vue";

	import { usePomodoroStore } from "@/store/pomodoro";
	import PomodoroInfo from "./PomodoroInfo.vue";
	const store = usePomodoroStore();

	// shortcut for getting data from store
	let get = () => ({
		at: store.current.at,
		running: store.current.running,
		rounds: store.current.config.rounds,

		focus: store.current.config.focus,
		break: store.current.config.break,
		rest: store.current.config.rest,
		duration: store.getDuration(store.current.config),
	});

	let stageType = () => store.getStage(store.current).type;
	let stageAt = () => store.current.at - store.getStage(store.current).start;
	let stageDuration = () =>
		store.getStage(store.current).end - store.getStage(store.current).start;

	let stage = () => store.getStage(store.current);

	const sessionControl = () => {
		get().at === 0
			? store.startSession()
			: get().running
			? store.pauseSession()
			: store.resumeSession();
	};
</script>

<template>
	<NCard>
		<NGrid :cols="3">
			<NGridItem span="2">
				<NSpace vertical :size="25">
					<!-- Title -->
					<NText size="large" type="primary">current</NText>

					<!-- Sliders -->
					<NSpace vertical>
						<PomodoroItem
							name="Rounds"
							bind="rounds"
							:min="1"
							:max="4"
							:step="1"
							:disable="get().at > 0"
						/>
						<PomodoroItem
							name="Focus"
							bind="focus"
							:min="20"
							:max="60"
							:step="10"
							:disable="get().at > 0"
						/>
						<PomodoroItem
							name="Break"
							bind="break"
							:min="3"
							:max="15"
							:step="3"
							:disable="get().at > 0"
						/>
						<PomodoroItem
							name="Rest"
							bind="rest"
							:min="10"
							:max="20"
							:step="5"
							:disable="get().at > 0"
						/>
					</NSpace>

					<!-- Info -->
					<PomodoroInfo />

					<!-- Buttons and Counter -->
					<NSpace align="center">
						<NButton circle @click="sessionControl()">
							<template #icon>
								<NIcon>
									<PauseFilled v-if="get().running" />
									<PlayArrowFilled v-else />
								</NIcon>
							</template>
						</NButton>

						<NButton
							:loading="get().running"
							strong
							secondary
							type="primary"
							v-if="get().at !== 0"
						>
							{{ stageDuration() - stageAt() }} left
						</NButton>
					</NSpace>
				</NSpace>
			</NGridItem>

			<!-- Timeline -->
			<NGridItem>
				<PomodoroTimeline></PomodoroTimeline>
			</NGridItem>
		</NGrid>
	</NCard>
</template>
