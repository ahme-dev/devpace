<script lang="ts" setup>
	import {
		NButton,
		NCard,
		NIcon,
		NText,
		NDrawer,
		NDrawerContent,
		NImage,
		NSwitch,
	} from "naive-ui";
	import { HelpFilled, SettingsFilled } from "@vicons/material";
	import { useMainStore } from "@/store/main";
	import { ref } from "vue";

	let text = ref("Take your time, you'll make something great.");

	let settingsIsShown = ref(false);
	let infoIsShown = ref(false);

	// app main app
	const mainStore = useMainStore();
</script>

<template>
	<div style="display: flex; flex-direction: column; gap: 0.5rem">
		<NDrawer
			v-model:show="settingsIsShown"
			placement="left"
			style="max-width: 100vw; min-width: 50vmin"
		>
			<NDrawerContent title="Settings" closable>
				<NCard contentStyle="display:flex;justify-content:space-between;">
					<NText style="font-weight: bold">Dark Theme</NText>
					<NSwitch v-model:value="mainStore.darkTheme" />
				</NCard>
			</NDrawerContent>
		</NDrawer>

		<!-- Info Drawer -->
		<NDrawer
			v-model:show="infoIsShown"
			placement="left"
			style="max-width: 100vw; min-width: 50vmin"
		>
			<NDrawerContent title="Info" closable>
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
			<NImage src="/logo.png" width="130" />

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
