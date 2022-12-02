export interface Duration {
	minutes: number;
	seconds: number;
}

export function makeDuration(minutes = 0, seconds = 0) {
	return { minutes: minutes, seconds: seconds };
}

export function getDurationString(d: Duration) {
	return `${d.minutes < 10 ? "0" + d.minutes : d.minutes}:${
		d.seconds < 10 ? "0" + d.seconds : d.seconds
	}`;
}

export function durationsEqual(d1: Duration, d2: Duration) {
	return d1.minutes === d2.minutes && d1.seconds === d2.seconds ? true : false;
}

export function plusSecond(d: Duration) {
	if (d.seconds == 59) {
		d.seconds = 0;
		d.minutes += 1;
	} else {
		d.seconds += 1;
	}
}

export function subSecond(d: Duration) {
	if (d.seconds == 0) {
		if (d.minutes == 0) {
			// nothing
		} else {
			d.seconds = 59;
			d.minutes -= 1;
		}
	} else {
		d.seconds -= 1;
	}
}
