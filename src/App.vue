<script setup lang="ts">
	import Pomodoro from "./components/Pomodoro.vue";
	import Notes from "./components/Notes.vue";

	import {
		NGrid,
		NGridItem,
		NGlobalStyle,
		NConfigProvider,
		darkTheme,
	} from "naive-ui";
</script>

<template>
	<NConfigProvider :theme="darkTheme">
		<div
			style="
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				padding: 1rem;
				gap: 1rem;
			"
		>
			<!-- Todo - Left -->
			<Notes style="height: fit-content"></Notes>

			<!-- Pomodoro - Right -->
			<Pomodoro style="height: fit-content"></Pomodoro>
		</div>

		<!-- style to body -->
		<NGlobalStyle></NGlobalStyle>
	</NConfigProvider>
</template>
