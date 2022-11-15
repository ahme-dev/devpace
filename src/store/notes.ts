import { ref } from "vue";
import { defineStore } from "pinia";

// types

export type Days = "yesterday" | "today" | "tomorrow";

export interface Day {
	name: Days;
	notes: string[];
}

// data

export const useNotesStore = defineStore("notes", () => {
	let days = ref<Day[]>([
		{
			name: "yesterday",
			notes: [],
		},
		{
			name: "today",
			notes: ["Hello"],
		},
		{
			name: "tomorrow",
			notes: [],
		},
	]);

	let getDay = (dayName: Days): Day => {
		let tab = days.value.find((day) => day.name == dayName);

		return tab ? tab : days.value[1];
	};

	let addNote = (day: Day) => day.notes.push("new");

	let cleanNotes = (day: Day) =>
		setTimeout(
			() => (day.notes = day.notes.filter((note) => note.trim() !== "")),
			1000
		);

	return { days, getDay, addNote, cleanNotes };
});
