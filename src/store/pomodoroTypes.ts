import type { Duration } from "./utils";

export type ConfigKeys = "rounds" | "focus" | "break" | "rest";

export interface Config {
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

export interface Session {
	status: "ready" | "paused" | "running" | "finished";
	at: {
		time: Duration;
		index: number;
	};
	stages: SessionStage[];
	duration: Duration;
	date: {
		time: {
			hours: number;
			minutes: number;
		};
		day: number;
		month: number;
		year: number;
	};
}

export interface SessionStage {
	length: Duration;
	type: "focus" | "break" | "rest";
}
