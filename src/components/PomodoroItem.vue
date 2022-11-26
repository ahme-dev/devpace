<script setup lang="ts">
	import { NText, NSlider, NInputNumber, NGrid, NGridItem } from "naive-ui";
	import type { ConfigKeys } from "../store/pomodoro";

	import { usePomodoroStore } from "@/store/pomodoro";
	const store = usePomodoroStore();

	const props = defineProps<{ bind: ConfigKeys }>();
</script>

<template>
	<div
		style="
			display: grid;
			grid-template-columns: repeat(5, 1fr);
			align-items: center;
			gap: 1rem;
		"
	>
		<!-- Text -->
		<NText style="justify-self: flex-end"> {{ props.bind }}</NText>

		<!-- Input -->
		<NInputNumber
			:disabled="store.current.status !== 'ready'"
			:showButton="false"
			:min="1"
			v-model:value="store.config[props.bind].at"
		/>

		<!-- Slider -->
		<NSlider
			style="grid-column: 3/6"
			:disabled="store.current.status !== 'ready'"
			:tooltip="false"
			:min="store.config[props.bind].min"
			:max="store.config[props.bind].max"
			:step="store.config[props.bind].step"
			v-model:value="store.config[props.bind].at"
		></NSlider>
	</div>
</template>
