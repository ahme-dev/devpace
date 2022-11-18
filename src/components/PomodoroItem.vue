<script setup lang="ts">
	import { NText, NSlider, NInputNumber, NGrid, NGridItem } from "naive-ui";
	import type { ConfigKeys } from "../store/pomodoro";

	import { usePomodoroStore } from "@/store/pomodoro";
	const store = usePomodoroStore();

	const props = defineProps<{
		name: string;
		bind: ConfigKeys;
		min: number;
		max: number;
		step: number;
	}>();
</script>

<template>
	<NGrid :cols="4" :xGap="16" style="align-items: center">
		<!-- Text -->
		<NGridItem style="text-align: end">
			<NText> {{ props.name }}</NText>
		</NGridItem>

		<!-- Input -->
		<NGridItem>
			<NInputNumber
				:min="props.min"
				:max="props.max"
				:step="props.step"
				v-model:value="store.current.config[props.bind]"
			></NInputNumber>
		</NGridItem>

		<!-- Slider -->
		<NGridItem span="2">
			<NSlider
				:min="props.min"
				:max="props.max"
				:step="props.step"
				:tooltip="false"
				v-model:value="store.current.config[props.bind]"
			></NSlider>
		</NGridItem>
	</NGrid>
</template>
