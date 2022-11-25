import { ref, renderSlot } from "vue";
import { defineStore } from "pinia";

// types

export type ConfigKeys = "rounds" | "focus" | "break" | "rest";

interface SessionConfig {
	rounds: {
		at: number;
		min: number;
		max: number;
		step: number;
	};
	focus: {
		at: number;
		min: number;
		max: number;
		step: number;
	};
	break: {
		at: number;
		min: number;
		max: number;
		step: number;
	};
	rest: {
		at: number;
		min: number;
		max: number;
		step: number;
	};
}

interface Session {
	status: "ready" | "paused" | "running" | "finished";
	at: {
		time: number;
		index: number;
	};
	stages: SessionStage[];
	duration: number;
}

interface SessionStage {
	length: number;
	type: "focus" | "break" | "rest";
}

// data

export const usePomodoroStore = defineStore("pomodoro", () => {
	// used for session creation
	// at field is bound to ui
	let config = ref<SessionConfig>({
		rounds: {
			at: 2,
			min: 1,
			max: 4,
			step: 1,
		},
		focus: {
			at: 25,
			min: 20,
			max: 60,
			step: 5,
		},
		break: {
			at: 3,
			min: 3,
			max: 15,
			step: 3,
		},
		rest: {
			at: 10,
			min: 10,
			max: 25,
			step: 5,
		},
	});

	// current session
	let current = ref<Session>({
		status: "ready",
		at: {
			time: 0,
			index: 0,
		},
		stages: [],
		duration: 0,
	});

	// history of sessions
	let history = ref<Session[]>([]);

	// set overall duration of the session
	const setDuration = () => {
		let duration = 0;
		for (let stage of current.value.stages) {
			duration += stage.length;
		}
		current.value.duration = duration;
	};

	// session creation
	// made by replacing current
	const createSession = () => {
		// loop by the number of rounds
		for (let i = 0; i < config.value.rounds.at; i++) {
			// add focus stage
			current.value.stages.push({
				type: "focus",
				length: config.value.focus.at,
			});

			// if last round, only add rest and skip break
			if (i + 1 == config.value.rounds.at) {
				current.value.stages.push({
					type: "rest",
					length: config.value.rest.at,
				});
				continue;
			}

			// add break stage
			current.value.stages.push({
				type: "break",
				length: config.value.break.at,
			});
		}

		// set duration and start session
		setDuration();
		startsession();
	};

	// session control

	const startsession = () => {
		const interval = setInterval(() => {
			// if reached the duration
			if (
				current.value.stages[current.value.at.index].length ===
				current.value.at.time
			) {
				// if last stage then end session
				if (current.value.at.index + 1 === current.value.stages.length) {
					endSession(interval);
					return;
				} else {
					// go to next stage and reset timer;
					current.value.at.index += 1;
					current.value.at.time = 0;
					pauseSession();
					return;
				}
			}

			// add to timer if running
			if (current.value.status === "running") current.value.at.time += 1;
		}, 1000);

		resumeSession();
	};

	const endSession = (interval: number) => {
		// stop interval
		clearInterval(interval);

		// set status to finished and add into history
		current.value.status = "finished";
		history.value.push(current.value);

		// reset current
		current.value.status = "ready";
		current.value.at.index = 0;
		current.value.at.time = 0;
		current.value.stages = [];
	};

	const resumeSession = () => (current.value.status = "running");
	const pauseSession = () => (current.value.status = "paused");

	return {
		current,
		config,
		history,

		createSession,
		resumeSession,
		pauseSession,
	};
});
