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
		<NGrid :cols="2" :xGap="16" style="padding: 1rem">
			<!-- Todo - Left -->
			<NGridItem>
				<Notes></Notes>
			</NGridItem>

			<!-- Pomodoro - Right -->
			<NGridItem>
				<Pomodoro></Pomodoro>
			</NGridItem>
		</NGrid>

		<!-- style to body -->
		<NGlobalStyle></NGlobalStyle>
	</NConfigProvider>
</template>
