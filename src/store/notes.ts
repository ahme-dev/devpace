import { ref } from "vue";
import { defineStore } from "pinia";

export const useNotesStore = defineStore("notes", () => {
	let yesterday = ref<string[]>([]);
	let today = ref<string[]>(["hello", "no"]);
	let tomorrow = ref<string[]>([]);

	return { yesterday, today, tomorrow };
});
