<script setup lang="ts">
	import { PlusFilled } from "@vicons/material";
	import { NCard, NTabs, NTabPane, NButton, NIcon, useMessage } from "naive-ui";
	import NotesDay from "./NotesDay.vue";

	import { useNotesStore } from "@/store/notes";
	const store = useNotesStore();

	const message = useMessage();
	const addNote = (day: any) => {
		store.addNote(day);
		message.success("Note added");
	};
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
				<NButton circle @click="addNote(day)" style="margin-top: 2rem">
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
