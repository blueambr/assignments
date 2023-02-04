import { describe, expect, it } from "vitest";

const getPriorityClick = require("./index");

// We only call this function for clicks with the same ip
describe("getPriorityClick", () => {
  it("Throws error, if amount is not a finite number", () => {
    expect(() =>
      getPriorityClick(
        { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: null },
        { ip: "11.11.11.11", timestamp: "3/11/2020 06:45:01", amount: 12.0 }
      )
    ).toThrowError("error");
  });

  it('Throws error, if timestamp is not in valid format: "d/M/y kk:mm:ss"', () => {
    expect(() =>
      getPriorityClick(
        { ip: "11.11.11.11", timestamp: "3/25/2020 02:13:11", amount: 7.25 },
        { ip: "11.11.11.11", timestamp: "3/11/2020 06:45:01", amount: 12.0 }
      )
    ).toThrowError("error");
  });

  it("Returns first click as it happened earlier and amounts are equal (in 1 hour period)", () => {
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

  it("Returns second click as it happened earlier and amounts are equal (in 1 hour period)", () => {
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

  it("Returns first click as its amount is greater (in 1 hour period)", () => {
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

  it("Returns second click as its amount is greater (in 1 hour period)", () => {
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

  it("Returns falsy result (null) as clicks are not in 1 hour period", () => {
    expect(
      getPriorityClick(
        { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
        { ip: "11.11.11.11", timestamp: "3/11/2020 06:45:01", amount: 12.0 }
      )
    ).toBeFalsy();
  });
});
