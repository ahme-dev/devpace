import { ref } from "vue";
import { defineStore } from "pinia";

export const useMainStore = defineStore(
	"main",
	() => {
		let darkTheme = ref(true);

		let toggleTheme = () => (darkTheme.value = !darkTheme.value);

		return { darkTheme, toggleTheme };
	},
	{ persist: true }
);
