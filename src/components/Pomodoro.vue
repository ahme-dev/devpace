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
							bind="rounds"
							:min="1"
							:max="4"
							:step="1"
							:disable="store.current.status !== 'tostart'"
						/>
						<PomodoroItem
							bind="focus"
							:min="20"
							:max="60"
							:step="10"
							:disable="store.current.status !== 'tostart'"
						/>
						<PomodoroItem
							bind="break"
							:min="3"
							:max="15"
							:step="3"
							:disable="store.current.status !== 'tostart'"
						/>
						<PomodoroItem
							bind="rest"
							:min="10"
							:max="20"
							:step="5"
							:disable="store.current.status !== 'tostart'"
						/>
					</NSpace>

					<!-- Info -->
					<PomodoroInfo />

					<!-- Buttons and Counter -->
					<NSpace align="center">
						<!-- Button -->
						<NButton circle @click="">
							<template #icon>
								<NIcon>
									<PauseFilled v-if="store.current.status === 'inprogress'" />
									<PlayArrowFilled v-else />
								</NIcon>
							</template>
						</NButton>

						<!-- Counter -->
						<NButton
							v-if="store.current.status !== 'tostart'"
							:loading="store.current.status === 'inprogress'"
							strong
							secondary
							type="primary"
						>
							{{ store.current.at.time }}
							mins left
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
