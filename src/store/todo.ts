import { ref } from "vue";
import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", () => {
	let state = ref({
		today: ["Hello", "hi"],
		tomorrow: [],
	});

	return { state };
});
