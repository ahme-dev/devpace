import { ref, renderSlot } from "vue";
import { defineStore } from "pinia";

// types

interface Session {
	status: "tostart" | "paused" | "inprogress" | "finished";
	at: {
		time: number;
		index: number;
	};
	stages: SessionStage[];
}

interface SessionStage {
	length: number;
	type: "focus" | "break" | "rest";
}

export type ConfigKeys = "rounds" | "focus" | "break" | "rest";

interface SessionConfig {
	rounds: number;
	focus: number;
	break: number;
	rest: number;
}

// data

export const usePomodoroStore = defineStore("pomodoro", () => {
	// used for session creation
	// bound to ui
	let config = ref<SessionConfig>({
		rounds: 2,
		focus: 30,
		break: 6,
		rest: 15,
	});

	// current session
	let current = ref<Session>({
		status: "tostart",
		at: {
			time: 0,
			index: 0,
		},
		stages: [],
	});

	// history of sessions
	let history = ref<Session[]>([]);

	// create a session by replacing current
	const createSession = () => {
		// reset current
		current.value.status = "tostart";
		current.value.at.index = 0;
		current.value.at.time = 0;
		current.value.stages = [];

		// loop by the number of rounds
		for (let i = 0; i < config.value.rounds; i++) {
			// add focus stage
			current.value.stages.push({ type: "focus", length: config.value.focus });

			// if last round, only add rest and skip break
			if (i + 1 == config.value.rounds) {
				current.value.stages.push({
					type: "rest",
					length: config.value.rest,
				});
				continue;
			}

			// add break stage
			current.value.stages.push({ type: "break", length: config.value.break });
		}
	};

	// get the overall duration of the session
	const getDuration = () => {
		let duration = 0;
		for (let stage of current.value.stages) {
			duration += stage.length;
			console.log(duration);
		}
		return duration;
	};

	// session control

	return {
		current,
		config,
		history,
		createSession,
		getDuration,
	};
});
