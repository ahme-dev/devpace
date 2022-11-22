<script setup lang="ts">
	import { NText, NSpace, NButton } from "naive-ui";

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
	});

	let stage = () => store.getStage(store.current);
</script>

<template>
	<!-- Session Specifier -->
	<NText v-if="get().at === 0">
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

	<!-- Session Stage Highlighter (only shows on run) -->
	<NSpace v-else vertical>
		<NText>Session in progress. In {{ stage().type }} stage.</NText>
		<NSpace align="center">
			<NButton
				v-for="s in store.current.stages"
				size="small"
				strong
				secondary
				:type="s == stage() ? 'primary' : 'default'"
			>
				{{ s.type }}
			</NButton>
		</NSpace>
	</NSpace>
</template>
