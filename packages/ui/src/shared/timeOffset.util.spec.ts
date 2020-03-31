import moment, { ISO_8601 } from "moment-timezone";
import { computeTimeDiffInMinutes, nextValidTime } from "./timeOffset.util";

describe("timeOffset", () => {
  describe("computeUtcOffset", () => {
    it("usage", () => {
      const against = moment("2000-01-01T00:00:00Z", ISO_8601);
      /**
       * 3 hours ahead in local time, 11 hours ahead in game
       */
      const candidate = moment("2000-01-01T11:00:00+0800", ISO_8601).utcOffset(8 * 60);
      expect(computeTimeDiffInMinutes(candidate, against)).toEqual(11 * 60);
    });
  });
  describe("nextValidTime", () => {
    it("valid until 12pm", () => {
      const localTime = moment("2000-01-01T11:30:00+1100", ISO_8601);
      const expectedNextValidTime = moment("2000-01-01T12:00:00+1100", ISO_8601); // 1 hour ahead in local time (12pm in local)
      const result = nextValidTime(localTime, 11 * 60);
      expect(result.diff(expectedNextValidTime)).toEqual(0);
    });
    it("valid until 10pm", () => {
      const localTime = moment("2000-01-01T13:30:00+1100", ISO_8601);
      const expectedNextValidTime = moment("2000-01-01T22:00:00+1100", ISO_8601); // 11 hour ahead in local time (8pm in local)
      const result = nextValidTime(localTime, 11 * 60);
      expect(result.diff(expectedNextValidTime)).toEqual(0);
    });
    it("with negative time diff", () => {
      const localTime = moment("2000-01-01T18:00:00-0500", ISO_8601);
      const expectedNextValidTime = moment("2000-01-02T03:00:00Z", ISO_8601); // 5 hours behind in local time (12pm in local)
      const result = nextValidTime(localTime, -5 * 60);
      expect(result.diff(expectedNextValidTime)).toEqual(0);
    });
    it("with time diff more than one day", () => {
      const localTime = moment("2000-01-02T14:00:00+1200", ISO_8601);
      const expectedNextValidTime = moment("2000-01-02T10:00:00.000Z", ISO_8601); // 5 hours behind in local time (12pm in local)
      const result = nextValidTime(localTime, 24 * 60 + 12 * 60);
      expect(result.diff(expectedNextValidTime)).toEqual(0);
    });
  });
});
