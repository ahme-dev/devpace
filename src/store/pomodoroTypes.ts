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
		time: number;
		index: number;
	};
	stages: SessionStage[];
	duration: number;
	date: string;
}

export interface SessionStage {
	length: number;
	type: "focus" | "break" | "rest";
}
