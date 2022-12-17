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
		NSelect,
	} from "naive-ui";
	import { HelpFilled, SettingsFilled } from "@vicons/material";
	import { useMainStore } from "@/store/main";
	import { ref, onMounted } from "vue";

	let text = ref("Take your time, you'll make something great.");

	let settingsIsShown = ref(false);
	let infoIsShown = ref(false);

	const mainStore = useMainStore();

	// on bar mount, call get text
	onMounted(async () => (text.value = await mainStore.getApiText()));
</script>

<template>
	<div style="display: flex; flex-direction: column; gap: 0.5rem">
		<NDrawer
			v-model:show="settingsIsShown"
			placement="left"
			style="max-width: 100vw; min-width: 50vmin"
		>
			<NDrawerContent
				title="Settings"
				closable
				bodyContentStyle="display:flex;flex-direction:column;gap:1rem;"
			>
				<NCard
					contentStyle="display:flex;justify-content:space-between;align-items:center"
				>
					<NText style="font-weight: bold">Dark Theme</NText>
					<NSwitch v-model:value="mainStore.darkTheme" />
				</NCard>

				<NCard
					contentStyle="display:flex;justify-content:space-between;align-items:center"
				>
					<NText style="font-weight: bold">Delete Buttons</NText>
					<NSwitch v-model:value="mainStore.deleteButtons" />
				</NCard>

				<NCard
					contentStyle="display:flex;justify-content:space-between;align-items:center"
				>
					<NText style="font-weight: bold">Api Text</NText>
					<NSelect
						style="width: 8rem"
						v-model:value="mainStore.apiText"
						:options="[
							{ label: 'Facts', value: 'facts' },
							{ label: 'Phrases', value: 'phrase' },
						]"
					/>
				</NCard>
			</NDrawerContent>
		</NDrawer>

		<!-- Info Drawer -->
		<NDrawer
			v-model:show="infoIsShown"
			placement="left"
			style="max-width: 100vw; min-width: 50vmin"
		>
			<NDrawerContent
				title="Info"
				closable
				bodyContentStyle="display:flex;flex-direction:column;gap:1rem;"
			>
				<NCard contentStyle="display:flex;flex-direction:column;gap:1rem">
					<p>
						In the <b>notes</b> section you can <b>add</b> notes in the
						<b>today</b> tab or the <b>tomorrow</b> one.
					</p>
					<p>
						To <b>delete</b> notes, either <b>enable delete buttons</b> or
						<b>empty out</b> the text in the note and press the <b>clear all</b>
						button.
					</p>
				</NCard>
				<NCard contentStyle="display:flex;flex-direction:column;gap:1rem">
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
				</NCard>
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
	a,
	b {
		font-weight: bold;
		text-decoration: none;
		color: #63e2b7;
	}
</style>
