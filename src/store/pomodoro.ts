import { ref, renderSlot } from "vue";
import { defineStore } from "pinia";

// types

interface SessionConfig {
	rounds: number;
	focus: number;
	break: number;
	rest: number;
}

interface Session {
	status: "ready" | "paused" | "running" | "finished";
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
		status: "ready",
		at: {
			time: 0,
			index: 0,
		},
		stages: [],
	});

	// history of sessions
	let history = ref<Session[]>([]);

	// get the overall duration of the session
	const getDuration = () => {
		let duration = 0;
		for (let stage of current.value.stages) {
			duration += stage.length;
			console.log(duration);
		}
		return duration;
	};

	// session creation
	// made by replacing current
	const createSession = () => {
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
		getDuration,

		createSession,
		resumeSession,
		pauseSession,
	};
});
