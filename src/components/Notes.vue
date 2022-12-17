<script setup lang="ts">
	import { PlusFilled, ClearAllFilled } from "@vicons/material";
	import {
		NCard,
		NTabs,
		NTabPane,
		NButton,
		NIcon,
		useMessage,
		NTooltip,
	} from "naive-ui";
	import NotesDay from "./NotesDay.vue";

	import { useNotesStore } from "@/store/notes";
	const store = useNotesStore();

	const message = useMessage();

	const addNote = (day: any) => {
		store.addNote(day);
		message.success("Note added");
	};

	const cleanNotes = (day: any) => {
		store.cleanNotes(day)
			? message.warning("Empty notes cleared")
			: message.info("No empty notes found");
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

				<div style="display: flex; gap: 1rem; margin-top: 1rem">
					<!-- add button -->

					<NTooltip trigger="hover">
						<template #trigger>
							<NButton circle @click="addNote(day)">
								<template #icon>
									<NIcon>
										<PlusFilled></PlusFilled>
									</NIcon>
								</template>
							</NButton>
						</template>
						Add new note
					</NTooltip>

					<!-- clear button -->
					<NTooltip trigger="hover">
						<template #trigger>
							<NButton circle @click="cleanNotes(day)">
								<template #icon>
									<NIcon>
										<ClearAllFilled></ClearAllFilled>
									</NIcon>
								</template>
							</NButton>
						</template>
						Clear out empty notes
					</NTooltip>
				</div>
			</NTabPane>
		</NTabs>
	</NCard>
</template>
