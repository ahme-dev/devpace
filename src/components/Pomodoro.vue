<script setup lang="ts">
	import { PlayArrowFilled, PauseFilled, CancelFilled } from "@vicons/material";
	import {
		NCard,
		NText,
		NButton,
		NIcon,
		NPopconfirm,
		useMessage,
	} from "naive-ui";
	import { computed, onMounted } from "vue";

	import { useTitle } from "@vueuse/core";

	import PomodoroItem from "./PomodoroItem.vue";
	import PomodoroTimeline from "./PomodoroTimeline.vue";

	import { usePomodoroStore } from "@/store/pomodoro";
	import PomodoroInfo from "./PomodoroInfo.vue";
	import { getDurationString } from "@/store/utils";
	const store = usePomodoroStore();

	const message = useMessage();
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
				message.success("Session started");
				store.createSession();
				store.resumeSession();
				break;
		}
	};

	const sessionCancel = () => {
		store.resetCurrent();
		message.warning("Session cancelled");
	};

	const title = computed(() => {
		if (store.current.status == "running" || store.current.status == "paused") {
			return `
				${store.current.status}:
				${store.current.stages[store.current.at.index].type}
				${
					store.current.stages[store.current.at.index].length.minutes -
					store.current.at.time.minutes
				}mins left`;
		}
	});

	useTitle(title);

	// start interval on app launch
	onMounted(() => store.createSession());
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
					<!-- Control Button -->
					<NButton circle @click="sessionAction">
						<template #icon>
							<NIcon>
								<PauseFilled v-if="store.current.status === 'running'" />
								<PlayArrowFilled v-else />
							</NIcon>
						</template>
					</NButton>

					<!-- Cancel Button -->
					<NButton
						circle
						@click="sessionCancel"
						v-if="store.current.status === 'paused'"
					>
						<template #icon>
							<NIcon>
								<CancelFilled />
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
						{{ getDurationString(store.current.at.time) }} of
						{{ store.current.stages[store.current.at.index].length.minutes }}
						mins
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
