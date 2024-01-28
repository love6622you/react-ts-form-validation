import { test, describe, expect } from "vitest";
import { addComma } from "./formatter";

// addComma
describe("addComma", () => {
  test("should add thousands separator to value", () => {
    expect(addComma("100")).toBe("100");
    expect(addComma("1000000000")).toBe("1,000,000,000");
  });

  test("should add thousands separator to value with decimal", () => {
    expect(addComma("1.102")).toBe("1.102");
    expect(addComma("11230.13")).toBe("11,230.13");
  });

  test("should add thousands separator to negative value with decimal", () => {
    expect(addComma("7855948.9527")).toBe("7,855,948.9527");
    expect(addComma("-7855948.9527")).toBe("-7,855,948.9527");
  });

  test("should return string", () => {
    expect(typeof addComma("1000")).toBe("string");
    expect(typeof addComma("-1000")).toBe("string");
  });
});
