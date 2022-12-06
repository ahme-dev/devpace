<script lang="ts" setup>
	import {
		NButton,
		NGradientText,
		NIcon,
		NText,
		NDrawer,
		NDrawerContent,
		NImage,
	} from "naive-ui";
	import { HelpFilled, SettingsFilled } from "@vicons/material";
	import { ref } from "vue";

	let text = ref("Take your time, you'll make something great.");

	let settingsIsShown = ref(false);
	let infoIsShown = ref(false);
</script>

<template>
	<div style="display: flex; flex-direction: column; gap: 0.5rem">
		<NDrawer v-model:show="settingsIsShown" placement="left">
			<NDrawerContent title="Settings" closable>
				Some configuration is gonna be here.
			</NDrawerContent>
		</NDrawer>

		<!-- Info Drawer -->
		<NDrawer v-model:show="infoIsShown" placement="left">
			<NDrawerContent title="Info" style="max-width: 100vw" closable>
				<div style="display: flex; flex-direction: column; gap: 0.5rem">
					<p>Developed by <a href="https://ahmed.systems">ahmed.systems</a></p>
					<p>
						Using
						<a href="https://pinia.vuejs.org/">Vue + Pinia</a>
						and
						<a href="http://www.naiveui.com">NaiveUI</a>
					</p>
					<p>
						Open-source on
						<a href="https://github.com/ahmeddots/devpace">Github</a>
					</p>
				</div>
			</NDrawerContent>
		</NDrawer>

		<!-- top -->
		<div>{{ text }}</div>

		<!-- bottom -->
		<div style="display: flex; gap: 1rem; align-items: center">
			<!-- logo -->
			<NImage src="../../logo.png" width="130" />

			<!-- options -->
			<NButton circle @click="settingsIsShown = !settingsIsShown">
				<template #icon>
					<NIcon><SettingsFilled /></NIcon>
				</template>
			</NButton>

			<NButton circle @click="infoIsShown = !infoIsShown">
				<template #icon>
					<NIcon><HelpFilled /></NIcon>
				</template>
			</NButton>
		</div>
	</div>
</template>

<style scoped>
	a {
		font-weight: bold;
		text-decoration: none;
		color: #63e2b7;
	}
</style>
