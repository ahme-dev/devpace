<script setup lang="ts">
	import { PlayArrowFilled, PauseFilled } from "@vicons/material";
	import { NCard, NText, NButton, NIcon } from "naive-ui";

	import PomodoroItem from "./PomodoroItem.vue";
	import PomodoroTimeline from "./PomodoroTimeline.vue";

	import { usePomodoroStore } from "@/store/pomodoro";
	import PomodoroInfo from "./PomodoroInfo.vue";
	const store = usePomodoroStore();

	// do an action on the session based on status
	const sessionAction = () => {
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
		<div class="pomodoro">
			<!-- Session -->
			<div
				style="
					grid-column: 1/3;
					display: flex;
					flex-direction: column;
					gap: 2rem;
				"
			>
				<!-- Title -->
				<NText size="large" type="primary">current</NText>

				<!-- Sliders -->
				<div style="display: flex; flex-direction: column; gap: 1rem">
					<PomodoroItem bind="rounds" />
					<PomodoroItem bind="focus" />
					<PomodoroItem bind="break" />
					<PomodoroItem bind="rest" />
				</div>

				<!-- Info -->
				<PomodoroInfo />

				<!-- Buttons and Counter -->
				<div style="display: flex; gap: 1rem">
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
				</div>
			</div>

			<!-- Timeline -->
			<PomodoroTimeline></PomodoroTimeline>
		</div>
	</NCard>
</template>

<style>
	.pomodoro {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}

	@media screen and (max-width: 600px) {
		.pomodoro {
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
