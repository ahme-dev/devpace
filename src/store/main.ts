import { ref } from "vue";
import { defineStore } from "pinia";

export const useMainStore = defineStore(
	"main",
	() => {
		let darkTheme = ref(true);

		let toggleTheme = () => (darkTheme.value = !darkTheme.value);

		let getText = async () => {
			return fetch("https://corporatebs-generator.sameerkumar.website/")
				.then((res) => res.json())
				.then((json) => json.phrase);
		};

		return { getText, darkTheme, toggleTheme };
	},
	{ persist: true }
);
