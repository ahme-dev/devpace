<script setup lang="ts">
	import { NText, NSlider, NInputNumber, NGrid, NGridItem } from "naive-ui";
	import type { ConfigKeys } from "../store/pomodoro";

	import { usePomodoroStore } from "@/store/pomodoro";
	const store = usePomodoroStore();

	const props = defineProps<{ bind: ConfigKeys }>();
</script>

<template>
	<NGrid :cols="5" :xGap="16" style="align-items: center">
		<!-- Text -->
		<NGridItem style="text-align: end">
			<NText> {{ props.bind }}</NText>
		</NGridItem>

		<!-- Input -->
		<NGridItem>
			<NInputNumber
				:disabled="store.current.status !== 'ready'"
				:showButton="false"
				:min="store.config[props.bind].min"
				:max="store.config[props.bind].max"
				:step="store.config[props.bind].step"
				v-model:value="store.config[props.bind].at"
			/>
		</NGridItem>

		<!-- Slider -->
		<NGridItem span="3">
			<NSlider
				:disabled="store.current.status !== 'ready'"
				:tooltip="false"
				:min="store.config[props.bind].min"
				:max="store.config[props.bind].max"
				:step="store.config[props.bind].step"
				v-model:value="store.config[props.bind].at"
			></NSlider>
		</NGridItem>
	</NGrid>
</template>
