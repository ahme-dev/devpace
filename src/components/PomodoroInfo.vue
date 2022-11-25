<script setup lang="ts">
	import { NText, NSpace, NButton } from "naive-ui";

	import { computed } from "vue";
	import { usePomodoroStore } from "@/store/pomodoro";
	const store = usePomodoroStore();

	const storeStageType = computed(
		() => store.current.stages[store.current.at.index].type
	);
</script>

<template>
	<!-- Session Specifier -->
	<NText v-if="store.current.status === 'ready'">
		Your session will be made up of
		<b>{{ store.config.rounds.at }}</b>
		rounds of
		<b>{{ store.config.focus.at }}</b>
		minutes focus periods, with
		<b>{{ store.config.break.at }}</b>
		minute break(s) in-between, and a final rest period of
		<b>{{ store.config.rest.at }}</b>
		minutes.
	</NText>

	<!-- Session Stage Highlighter (only shows on run) -->
	<NSpace v-else vertical>
		<NText>Session in progress. In {{ storeStageType }} stage.</NText>
		<NSpace align="center">
			<NButton
				v-for="stage in store.current.stages"
				size="small"
				strong
				secondary
				:type="stage.type == storeStageType ? 'primary' : 'default'"
			>
				{{ stage.type }}
			</NButton>
		</NSpace>
	</NSpace>
</template>
