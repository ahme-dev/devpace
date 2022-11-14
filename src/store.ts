import { ref } from "vue";
import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
	const todo = ref({
		today: [],
		tomorrow: [],
	});

	return { todo };
});
