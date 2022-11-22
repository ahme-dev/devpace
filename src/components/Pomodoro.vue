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

	import { usePomodoroStore } from "@/store/pomodoro";
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
</script>

<template>
	<NCard>
		<NGrid :cols="3">
			<NGridItem span="2">
				<NSpace vertical :size="25">
					<NText size="large" type="primary">do</NText>

					<!-- Sliders -->
					<NSpace vertical>
						<PomodoroItem
							name="Rounds"
							bind="rounds"
							:min="1"
							:max="4"
							:step="1"
							:disable="store.current.at > 0"
						/>
						<PomodoroItem
							name="Focus"
							bind="focus"
							:min="20"
							:max="60"
							:step="10"
							:disable="store.current.at > 0"
						/>
						<PomodoroItem
							name="Break"
							bind="break"
							:min="3"
							:max="15"
							:step="3"
							:disable="store.current.at > 0"
						/>
						<PomodoroItem
							name="Rest"
							bind="rest"
							:min="10"
							:max="20"
							:step="5"
							:disable="store.current.at > 0"
						/>
					</NSpace>

					<!-- Session Info (only show before run) -->
					<NText v-if="get().at === 0">
						Your session will be made up of
						<b>{{ get().rounds }}</b>
						rounds of
						<b>{{ get().focus }}</b>
						minutes focus periods, with
						<b>{{ get().break }}</b>
						minute break(s) in-between, and a final rest period of
						<b>{{ get().rest }}</b>
						minutes. Totalling
						<b>{{ get().duration }}</b> minutes.
					</NText>

					<!-- Session Stage Highlighter (only shows on run) -->
					<NSpace align="center" v-else>
						<template v-for="s in store.current.stages">
							<NButton
								size="small"
								v-if="s == stage()"
								strong
								secondary
								type="primary"
							>
								{{ s.type }}
							</NButton>

							<NButton size="small" v-else strong secondary>
								{{ s.type }}
							</NButton>
						</template>
					</NSpace>

					<NSpace align="center">
						<!-- Button (at start) -->
						<NButton v-if="get().at === 0" @click="store.startSession">
							<template #icon>
								<NIcon> <PlayArrowFilled></PlayArrowFilled> </NIcon>
							</template>
							Start
						</NButton>

						<!-- Button (when stopped) -->
						<NButton v-else-if="!get().running" @click="store.resumeSession">
							<template #icon>
								<NIcon> <PlayArrowFilled></PlayArrowFilled> </NIcon>
							</template>
							Resume
						</NButton>

						<!-- Button (when running) -->
						<NButton v-else-if="get().running" @click="store.pauseSession">
							<template #icon>
								<NIcon> <PauseFilled></PauseFilled> </NIcon>
							</template>
							Pause
						</NButton>

						<!-- Counter (only shows on run) -->
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
				<NSpace justify="center" style="overflow: auto">
					<NTimeline>
						<NTimelineItem
							v-for="s in store.history"
							:content="s.at.toString()"
						/>
					</NTimeline>
				</NSpace>
			</NGridItem>
		</NGrid>
	</NCard>
</template>
