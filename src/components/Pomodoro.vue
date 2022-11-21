<script setup lang="ts">
	import { PlayArrowFilled } from "@vicons/material";
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
		rounds: store.current.config.rounds,
		focus: store.current.config.focus,
		break: store.current.config.break,
		rest: store.current.config.rest,
		duration: store.getDuration(store.current.config),

		stage: store.getStage(store.current).type,
		stageAt: store.current.at - store.getStage(store.current).start,
		stageDuration:
			store.getStage(store.current).end - store.getStage(store.current).start,
	});
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

					<!-- Info -->
					<NText>
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

					<!-- Button and Counter -->
					<NSpace align="center">
						<NButton>
							<template #icon>
								<NIcon> <PlayArrowFilled></PlayArrowFilled> </NIcon>
							</template>
							Start
						</NButton>

						<NGradientText :size="24">
							{{ get().stage }}
							{{ get().stageAt }}:{{ get().stageDuration }}
						</NGradientText>
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
