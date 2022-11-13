import { ref } from "vue";
import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
	const count = ref(0);
	const increment = () => {
		count.value++;
	};

	return { count, increment };
});
