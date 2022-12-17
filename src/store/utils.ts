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

export function getTimeString(
	twentyFourHours: boolean,
	hours: number,
	minutes: number
) {
	// 24 hour system

	if (twentyFourHours) return `${addZeros(hours)}:${addZeros(minutes)}`;

	// 12 hour system

	if (hours == 24) return `12:${addZeros(minutes)} AM`;
	if (hours == 12) return `12:${addZeros(minutes)} PM`;
	return hours > 12
		? `${addZeros(hours - 12)}:${addZeros(minutes)} PM`
		: `${addZeros(hours)}:${addZeros(minutes)} AM`;
}

const addZeros = (num: number) => (num < 10 ? `0${num}` : num);
