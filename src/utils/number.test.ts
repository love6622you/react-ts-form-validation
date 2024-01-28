import { test, describe, expect } from "vitest";
import { getNumberIntervals } from "./number";

// getNumberIntervals
describe("getNumberIntervals", () => {
  test("should return overlap and notInclude", () => {
    expect(
      getNumberIntervals([
        [6, 11],
        [5, 8],
        [17, 20],
        [7, 7],
        [14, 17]
      ])
    ).toEqual({
      overlap: [
        [6, 8],
        [17, 17]
      ],
      notInclude: [
        [0, 4],
        [12, 13]
      ]
    });
  });
});
