import _ from "lodash";
import { Moment } from "moment-timezone/moment-timezone";

/**
 * computes time difference in minutes based on current time
 * @param candidate
 * @param computeAgainst
 */
export function computeTimeDiffInMinutes(candidate: Moment, computeAgainst: Moment): number {
  return candidate.diff(computeAgainst, "minutes") + candidate.utcOffset();
}

/**
 * computes the next timestamp at 12pm or 8pm at time local to the time difference
 * @param currentTime
 * @param timeDiffInMinutes
 */
export function nextValidTime(currentTime: Moment, timeDiffInMinutes: number): Moment {
  const currentLocalTime = currentTime.clone().utc();

  const localHours = ((currentLocalTime.get("hours") * 60 + timeDiffInMinutes) % (24 * 60)) / 60;
  const localMinutes = currentLocalTime.get("minutes");
  const localMinutesSinceDayStart = localHours * 60 + localMinutes;

  const nextMorningEndsInMinutes = 12 * 60 - localMinutesSinceDayStart;
  const nextEveningEndsInMinutes = 20 * 60 - localMinutesSinceDayStart;
  const nextEndsInMinutes = _.find([nextMorningEndsInMinutes, nextEveningEndsInMinutes], (i) => i > 0) || NaN;

  return currentTime.clone().add(nextEndsInMinutes, "minutes");
}
