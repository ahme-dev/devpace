<script setup lang="ts">
	import { PlayArrowFilled, PauseFilled } from "@vicons/material";
	import {
		NCard,
		NText,
		NSpace,
		NGrid,
		NGridItem,
		NButton,
		NIcon,
	} from "naive-ui";

	import PomodoroItem from "./PomodoroItem.vue";
	import PomodoroTimeline from "./PomodoroTimeline.vue";

	import { usePomodoroStore } from "@/store/pomodoro";
	import PomodoroInfo from "./PomodoroInfo.vue";
	const store = usePomodoroStore();

	// do an action on the session based on status
	const sessionAction = () => {
		console.log("running session");
		switch (store.current.status) {
			case "running":
				store.pauseSession();
				break;
			case "paused":
				store.resumeSession();
				break;
			case "ready":
				store.createSession();
				break;
		}
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
						<PomodoroItem bind="rounds" />
						<PomodoroItem bind="focus" />
						<PomodoroItem bind="break" />
						<PomodoroItem bind="rest" />
					</NSpace>

					<!-- Info -->
					<PomodoroInfo />

					<!-- Buttons and Counter -->
					<NSpace align="center">
						<!-- Button -->
						<NButton circle @click="sessionAction">
							<template #icon>
								<NIcon>
									<PauseFilled v-if="store.current.status === 'running'" />
									<PlayArrowFilled v-else />
								</NIcon>
							</template>
						</NButton>

						<!-- Counter -->
						<NButton
							v-if="store.current.status !== 'ready'"
							:loading="store.current.status === 'running'"
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
