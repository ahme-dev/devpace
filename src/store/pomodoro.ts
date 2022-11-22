import { ref, renderSlot } from "vue";
import { defineStore } from "pinia";

// types

interface Session {
	running: boolean;
	at: number;
	stopFunc: () => void;
	config: SessionConfig;
	stages: SessionStage[];
}

interface SessionConfig {
	rounds: number;
	focus: number;
	break: number;
	rest: number;
}

interface SessionStage {
	start: number;
	end: number;
	// will have to change
	type: ConfigKeys;
}

export type ConfigKeys = "rounds" | "focus" | "break" | "rest";

// data

export const usePomodoroStore = defineStore("pomodoro", () => {
	// current session
	let current = ref<Session>({
		running: false,
		at: 0,
		stopFunc: () => {},
		config: {
			rounds: 2,
			focus: 30,
			break: 6,
			rest: 15,
		},
		stages: [],
	});

	// history of sessions
	let history = ref<Session[]>([
		{
			running: false,
			at: 80,
			stopFunc: () => {},
			config: {
				rounds: 2,
				focus: 30,
				break: 5,
				rest: 15,
			},
			stages: [],
		},
		{
			running: false,
			at: 75,
			stopFunc: () => {},
			config: {
				rounds: 3,
				focus: 20,
				break: 5,
				rest: 10,
			},
			stages: [],
		},
	]);

	// get the overall duration of the session from the config
	const getDuration = (c: SessionConfig) => {
		return c.rounds * c.focus + (c.rounds - 1) * c.break + c.rest;
	};

	// add map of stages for session
	const mapStages = (s: Session) => {
		// list of stages
		let stages = <SessionStage[]>[];

		// get the end value of the last element
		let getLastEnd = (list: SessionStage[]) =>
			list.length === 0 ? 0 : list[list.length - 1].end + 1;

		// map all stages into the list
		for (let i = 0; i < s.config.rounds; i++) {
			// add focus stage
			stages.push({
				type: "focus",
				start: getLastEnd(stages),
				end: getLastEnd(stages) + s.config.focus - 1,
			});

			// if last round, only add rest and skip break
			if (i + 1 == s.config.rounds) {
				stages.push({
					type: "rest",
					start: getLastEnd(stages),
					end: getLastEnd(stages) + s.config.rest - 1,
				});
				continue;
			}

			// add break stage
			stages.push({
				type: "break",
				start: getLastEnd(stages),
				end: getLastEnd(stages) + s.config.break - 1,
			});
		}

		// add stages list to session
		s.stages = stages;
	};

	// get the stage at which the session is at
	const getStage = (s: Session): SessionStage => {
		// add stage mapping if not found on session
		if (s.stages.length === 0) mapStages(s);

		// go through each stage
		for (let stage of s.stages) {
			// return if at the range for stage
			if (stage.start <= s.at && s.at <= stage.end) return stage;
		}

		// return last stage if couldn't determine
		return s.stages[s.stages.length - 1];
	};

	// session control

	const startSession = () => {
		current.value.running = true;
		const interval = setInterval(() => {
			// if running add value
			if (current.value.running) current.value.at += 1;

			// if finished, stop session
			if (current.value.at === getDuration(current.value.config)) stopSession();
		}, 1000);

		current.value.stopFunc = () => {
			clearInterval(interval);
		};
	};

	const stopSession = () => {
		// stop the running interval
		current.value.stopFunc();
		current.value.running = false;
		// add to history
		console.log("At", current.value.at);
		history.value.push(current.value);
		// reset position to 0
		current.value.at = 0;
	};

	const resumeSession = () => (current.value.running = true);

	const pauseSession = () => (current.value.running = false);

	return {
		current,
		history,
		getDuration,
		getStage,
		startSession,
		resumeSession,
		pauseSession,
	};
});
