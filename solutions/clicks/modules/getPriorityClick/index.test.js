import { describe, expect, it } from "vitest";

const getPriorityClick = require("./index");

describe("getPriorityClick", () => {
  it("Amount error, should be finite number", () => {
    expect(() =>
      getPriorityClick(
        { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: null },
        { ip: "11.11.11.11", timestamp: "3/11/2020 06:45:01", amount: 12.0 }
      )
    ).toThrowError("error");
  });

  it('Timestamp error, should be in valid format: "d/M/y kk:mm:ss"', () => {
    expect(() =>
      /**
       * In the first click we use the day as a second number in the date instead of the month,
       * while the timestampFormat we set says it should be otherwise ("d/M/y kk:mm:ss")
       */
      getPriorityClick(
        { ip: "11.11.11.11", timestamp: "3/25/2020 02:13:11", amount: 7.25 },
        { ip: "11.11.11.11", timestamp: "3/11/2020 06:45:01", amount: 12.0 }
      )
    ).toThrowError("error");
  });

  it("If amounts are equal, first click has priority", () => {
    expect(
      getPriorityClick(
        { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 7.25 },
        { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 }
      )
    ).toEqual({
      ip: "11.11.11.11",
      timestamp: "3/11/2020 02:12:32",
      amount: 7.25,
    });
  });

  it("If amounts are equal, second click has priority", () => {
    expect(
      getPriorityClick(
        { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
        { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 7.25 }
      )
    ).toEqual({
      ip: "11.11.11.11",
      timestamp: "3/11/2020 02:12:32",
      amount: 7.25,
    });
  });

  it("First click has priority", () => {
    expect(
      getPriorityClick(
        { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
        { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 6.5 }
      )
    ).toEqual({
      ip: "11.11.11.11",
      timestamp: "3/11/2020 02:13:11",
      amount: 7.25,
    });
  });

  it("Second click has priority", () => {
    expect(
      getPriorityClick(
        { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 6.5 },
        { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 }
      )
    ).toEqual({
      ip: "11.11.11.11",
      timestamp: "3/11/2020 02:13:11",
      amount: 7.25,
    });
  });

  it("Should return falsy result (null)", () => {
    expect(
      getPriorityClick(
        { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
        { ip: "11.11.11.11", timestamp: "3/11/2020 06:45:01", amount: 12.0 }
      )
    ).toBeFalsy();
  });
});
