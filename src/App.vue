<script setup lang="ts">
	import Pomodoro from "./components/Pomodoro.vue";
	import Notes from "./components/Notes.vue";
	import AppBar from "./components/AppBar.vue";
	import { NGlobalStyle, NConfigProvider, darkTheme } from "naive-ui";
</script>

<template>
	<NConfigProvider :theme="darkTheme">
		<div class="app">
			<Notes style="height: fit-content" />

			<Pomodoro style="height: fit-content" />

			<AppBar style="align-self: flex-end; padding: 1rem" />
		</div>

		<!-- style to body -->
		<NGlobalStyle></NGlobalStyle>
	</NConfigProvider>
</template>

<style>
	.app {
		min-height: 100vh;
		min-width: 100vw;

		display: grid;
		grid-template-columns: repeat(2, 1fr);

		padding: 1rem;
		gap: 1rem;
	}

	@media screen and (max-width: 600px) {
		.app {
			grid-template-columns: repeat(1, 1fr);

			padding: 0.5rem;
			gap: 0.5rem;
		}
	}
</style>
