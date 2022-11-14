import { ref } from "vue";
import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", () => {
	let today = ref<string[]>(["hello", "no"]);
	let tomorrow = ref<string[]>([]);

	return { today, tomorrow };
});
