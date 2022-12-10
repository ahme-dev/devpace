import { ref } from "vue";
import { defineStore } from "pinia";

// types

export type Days = "today" | "tomorrow";

export interface Day {
	name: Days;
	notes: string[];
}

// data

export const useNotesStore = defineStore(
	"notes",
	() => {
		let days = ref<Day[]>([
			{
				name: "today",
				notes: [],
			},
			{
				name: "tomorrow",
				notes: [],
			},
		]);

		let getDay = (dayName: Days): Day => {
			const tab = days.value.find((day) => day.name == dayName);

			return tab ? tab : days.value[1];
		};

		let addNote = (day: Day) => day.notes.push("");

		let cleanNotes = (day: Day): boolean => {
			// filter out empty notes
			const cleaned = day.notes.filter((note) => note.trim() !== "");

			// if no changes made return false
			if (JSON.stringify(cleaned) === JSON.stringify(day.notes)) {
				return false;
			}

			// else set new value and return true
			day.notes = cleaned;
			return true;
		};

		return { days, getDay, addNote, cleanNotes };
	},
	{ persist: true }
);
