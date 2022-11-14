import { ref } from "vue";
import { defineStore } from "pinia";

export const useNotesStore = defineStore("notes", () => {
	let state = {
		yesterday: ref<string[]>([]),
		today: ref<string[]>(["hello", "no"]),
		tomorrow: ref<string[]>([]),
	};

	let ui = ref({
		onTab: "today",
		onNote: -1,
	});

	return { state, ui };
});
