import { ref } from "vue";
import { defineStore } from "pinia";

// types

export type Tabs = "yesterday" | "today" | "tomorrow";

export interface Tab {
	name: Tabs;
	notes: Note[];
}

export interface Note {
	title: string;
	body: string;
}

// data

export const useNotesStore = defineStore("notes", () => {
	// tabs
	let state = ref<Tab[]>([
		{
			name: "yesterday",
			notes: [],
		},
		{
			name: "today",
			notes: [{ title: "Hello", body: "This is some text" }],
		},
		{
			name: "tomorrow",
			notes: [],
		},
	]);

	// get one tab
	let getState = (tabName: Tabs): Tab => {
		switch (tabName) {
			case "yesterday":
				return state.value[0];
			case "today":
				return state.value[1];
			case "yesterday":
				return state.value[2];
		}
		return state.value[0];
	};

	return { state, getState };
});
