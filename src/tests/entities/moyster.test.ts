import { MoysterCard } from "../../entities";
import { describe, it, expect } from "vitest";

describe("MoysterCard", () => {
  it("should create moyster card with given balance", () => {
    const moyster = new MoysterCard(100);
    expect(moyster.getBalance()).toBe(100);
  });
});
