import { ref } from "vue";
import { defineStore } from "pinia";

import type { Config, Session } from "./pomodoroTypes";

import { makeDuration, type Duration } from "./utils";
import { plusSecond, subSecond, durationsEqual } from "./utils";

export const usePomodoroStore = defineStore(
	"pomodoro",
	() => {
		// used for session creation
		// at field is bound to ui
		let config = ref<Config>({
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
				time: makeDuration(),
				index: 0,
			},
			stages: [],
			duration: makeDuration(),
			date: {
				time: "00:00",
				day: 0,
				month: 0,
				year: 0,
			},
		});

		let resetCurrent = () => {
			current.value.status = "ready";
			current.value.at.index = 0;
			current.value.at.time = makeDuration();
			current.value.stages = [];
			current.value.duration = makeDuration();
			current.value.date = {
				day: 0,
				month: 0,
				year: 0,
				time: "00:00",
			};
		};

		// history of sessions
		let history = ref<Session[]>([]);

		// set overall duration of the session
		const getDuration = () => {
			let duration = makeDuration();
			for (let stage of current.value.stages) {
				duration.minutes += stage.length.minutes;
			}
			return duration;
		};

		// session creation
		// made by replacing current
		const createSession = () => {
			// loop by the number of rounds
			for (let i = 0; i < config.value.rounds.at; i++) {
				// add focus stage
				current.value.stages.push({
					type: "focus",
					length: { minutes: config.value.focus.at, seconds: 0 },
				});

				// if last round, only add rest and skip break
				if (i + 1 == config.value.rounds.at) {
					current.value.stages.push({
						type: "rest",
						length: { minutes: config.value.rest.at, seconds: 0 },
					});
					continue;
				}

				// add break stage
				current.value.stages.push({
					type: "break",
					length: { minutes: config.value.break.at, seconds: 0 },
				});
			}

			startInterval();
		};

		// session control

		let sessionInterval = ref(0);

		const startInterval = () => {
			// if an interval is running don't make another one
			if (sessionInterval.value !== 0) return;

			const interval = setInterval(() => {
				// if reached the duration
				if (
					durationsEqual(
						current.value.stages[current.value.at.index].length,
						current.value.at.time
					)
				) {
					// if last stage then end session
					if (current.value.at.index + 1 === current.value.stages.length) {
						endSession(interval);
					} else {
						// go to next stage and reset timer;
						current.value.at.index += 1;
						current.value.at.time = makeDuration();
						pauseSession();
					}
				}

				// add to timer if running
				if (current.value.status === "running")
					plusSecond(current.value.at.time);
			}, 1000);

			sessionInterval.value = interval;
		};

		const endSession = (interval: number) => {
			// stop interval
			clearInterval(interval);

			// set status, date, and duration
			current.value.duration = getDuration();
			current.value.status = "finished";
			let now = new Date();
			console.log(now);
			current.value.date = {
				day: now.getDate(),
				month: now.getMonth(),
				year: now.getFullYear(),
				time: `${now.getHours()}:${now.getMinutes()}`,
			};
			// put into history
			history.value.push({ ...current.value });

			resetCurrent();
		};

		const resumeSession = () => (current.value.status = "running");
		const pauseSession = () => (current.value.status = "paused");

		return {
			current,
			config,
			history,

			createSession,
			startInterval,
			resumeSession,
			pauseSession,
			resetCurrent,
		};
	},
	{
		persist: true,
	}
);
