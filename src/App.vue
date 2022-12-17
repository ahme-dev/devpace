<script setup lang="ts">
	import Pomodoro from "./components/Pomodoro.vue";
	import Notes from "./components/Notes.vue";
	import AppBar from "./components/AppBar.vue";
	import {
		NGlobalStyle,
		NConfigProvider,
		darkTheme,
		lightTheme,
		NMessageProvider,
	} from "naive-ui";

	import { useMainStore } from "@/store/main";
	const mainStore = useMainStore();
</script>

<template>
	<NConfigProvider :theme="mainStore.darkTheme ? darkTheme : lightTheme">
		<NMessageProvider>
			<div class="app">
				<Notes style="height: fit-content" />

				<Pomodoro style="height: fit-content" />

				<AppBar style="align-self: flex-end; padding: 1rem" />
			</div>
		</NMessageProvider>
		<!-- style to body -->
		<NGlobalStyle></NGlobalStyle>
	</NConfigProvider>
</template>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

	.app {
		font-family: "Roboto", sans-serif;

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
