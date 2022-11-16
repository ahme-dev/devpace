<script setup lang="ts">
	import { PlayArrowFilled } from "@vicons/material";
	import {
		NCard,
		NText,
		NSpace,
		NSlider,
		NInputNumber,
		NGrid,
		NGridItem,
		NTimeline,
		NTimelineItem,
		NButton,
		NIcon,
	} from "naive-ui";

	import { usePomodoroStore } from "@/store/pomodoro";
	const store = usePomodoroStore();

	let marks = {
		rounds: {
			1: "1",
			2: "2",
			3: "3",
			4: "4",
		},
		focus: {
			20: "20",
			30: "30",
			40: "40",
			50: "50",
			60: "60",
		},
		break: {
			5: "5",
			10: "10",
			15: "15",
		},
		rest: {
			10: "10",
			15: "15",
			20: "20",
		},
	};
</script>

<template>
	<NCard>
		<NGrid :cols="2">
			<NGridItem>
				<NSpace vertical :size="25">
					<NText size="large" type="primary">do</NText>

					<NSpace vertical>
						<NSlider
							:min="1"
							:max="4"
							:marks="marks.rounds"
							:tooltip="false"
							v-model:value="store.current.config.rounds"
						></NSlider>

						<NSlider
							:min="20"
							:max="60"
							:marks="marks.focus"
							:step="5"
							:tooltip="false"
							v-model:value="store.current.config.focus"
						></NSlider>

						<NSlider
							:min="5"
							:max="15"
							:step="5"
							:marks="marks.break"
							:tooltip="false"
							v-model:value="store.current.config.break"
						></NSlider>

						<NSlider
							:min="10"
							:max="20"
							:step="5"
							:marks="marks.rest"
							:tooltip="false"
							v-model:value="store.current.config.rest"
						></NSlider>
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

					<NButton>
						<template #icon>
							<NIcon> <PlayArrowFilled></PlayArrowFilled> </NIcon>
						</template>
						Start
					</NButton>
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
