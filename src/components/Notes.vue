<script setup lang="ts">
	import { PlusFilled } from "@vicons/material";
	import { NCard, NTabs, NTabPane, NButton, NIcon } from "naive-ui";
	import NotesDay from "./NotesDay.vue";

	import { useNotesStore } from "@/store/notes";
	const store = useNotesStore();
</script>

<template>
	<NCard>
		<NTabs
			type="bar"
			tabStyle="padding-top: 0rem; margin-top: 0rem"
			animated
			defaultValue="today"
		>
			<NTabPane v-for="day in store.days" :name="day.name" :tab="day.name">
				<!-- list of notes -->
				<NotesDay :dayName="day.name"></NotesDay>
				<!-- add button -->
				<NButton circle @click="store.addNote(day)" style="margin-top: 2rem">
					<template #icon>
						<NIcon>
							<PlusFilled></PlusFilled>
						</NIcon>
					</template>
				</NButton>
			</NTabPane>
		</NTabs>
	</NCard>
</template>
