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
</script>

<template>
	<NCard>
		<NGrid :cols="3">
			<NGridItem span="2">
				<NSpace vertical :size="25">
					<NText size="large" type="primary">do</NText>

					<NSpace vertical>
						<PomodoroItem
							name="Rounds"
							bind="rounds"
							:min="1"
							:max="4"
							:step="1"
						/>
						<PomodoroItem
							name="Focus"
							bind="focus"
							:min="20"
							:max="60"
							:step="10"
						/>
						<PomodoroItem
							name="Break"
							bind="break"
							:min="3"
							:max="15"
							:step="3"
						/>
						<PomodoroItem
							name="Rest"
							bind="rest"
							:min="10"
							:max="20"
							:step="5"
						/>
					</NSpace>

					<NText>
						Your session will be made up of
						<b>{{ store.current.config.rounds }}</b>
						rounds of
						<b>{{ store.current.config.focus }}</b>
						minutes focus periods, with
						<b>{{ store.current.config.break }}</b>
						minute break(s) in-between, and a final rest period of
						<b>{{ store.current.config.rest }}</b>
						minutes.
					</NText>

					<NSpace align="center">
						<NButton>
							<template #icon>
								<NIcon> <PlayArrowFilled></PlayArrowFilled> </NIcon>
							</template>
							Start
						</NButton>

						<hr />

						<NGradientText :size="24">{{ store.current.at }}</NGradientText>
					</NSpace>
				</NSpace>
			</NGridItem>

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
