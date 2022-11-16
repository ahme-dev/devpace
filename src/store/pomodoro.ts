import { ref } from "vue";
import { defineStore } from "pinia";

// types

interface Session {
	running: boolean;
	at: number;
	config: SessionConfig;
}

interface SessionConfig {
	rounds: number;
	focus: number;
	break: number;
	rest: number;
}

// data

export const usePomodoroStore = defineStore("pomodoro", () => {
	// current session
	let current = ref<Session>({
		running: false,
		at: 0,
		config: {
			rounds: 2,
			focus: 30,
			break: 5,
			rest: 15,
		},
	});

	// history of sessions
	let history = ref<Session[]>([
		{
			running: false,
			at: 80,
			config: {
				rounds: 2,
				focus: 30,
				break: 5,
				rest: 15,
			},
		},
		{
			running: false,
			at: 75,
			config: {
				rounds: 3,
				focus: 20,
				break: 5,
				rest: 10,
			},
		},
	]);

	return { current, history };
});
